import { Request, Response, Router } from "express";
import { db } from "../lib/db";
import { authenticateToken } from "../middlewares/authToken";
import { authorizeCustomer } from "../middlewares/authCustomer";
import { User } from "@prisma/client";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//@desc     get Receipt 
//@route    GET /payment/receipt/:bookingId
//@access   Private

export const getReceipt = async (req : Request,res : Response) => {
    const {bookingId} = req.params;

    const user: User = req.body.user;
    delete req.body.user;
    try {
        const result = await db.booking.findUnique({where : {id : bookingId,transaction : {type : "BookingPayment"}}, include : {
            customer : {select : {email : true,firstName : true,lastName : true}},
            transaction : true,
            roomType : {select : {name : true,capacity : true ,dorm : {select : {name : true, images : true}}}}

        }})
        
        console.log(result);
        
        if (!result) return res.status(404);
        if (user.id !== result.customerId) return res.status(403);
        if (!result.transaction) return res.status(404);

        
        
        return res.send(result);
    } catch(err) {
        console.log(err);
        return res.status(403);
    }
};

//@desc     Create Payment Intent
//@route    POST /payment/create-payment-intent
//@access   Private

export const createPaymentIntent = async (req : Request,res : Response) => {
    const { bookingId } = req.body;

    try {
        const bookingRes = await db.booking.findUnique({
            where: {
                id: bookingId
            }
        })

        if (!bookingRes) {
            res.status(404).send("Booking not found")
        }


        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
          amount: bookingRes?.price,
          currency: "thb",
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          automatic_payment_methods: {
            enabled: true,
          },
        });
    
        res.send({
          clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        res.status(400).send("Error occur")
    }
};

//@desc     Create Checkout Session
//@route    POST /payment/create-checkout-session/:bookingId
//@access   Private

export const createCheckoutSession = async (req : Request,res : Response) => {

    const { bookingId } = req.params;

    try {
        const bookingRes = await db.booking.findUnique({
            where: {
                id: bookingId
            },
            include: {
                roomType: {
                    include: {
                        dorm: true
                    }
                }
            }
        })

        if (!bookingRes) {
            return res.status(404).send("Booking not found")
        }

        const product = await stripe.products.create({
            name: bookingRes.roomType.name + " - " + bookingRes.roomType.dorm.name,
        });

        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: Math.min(Math.max(bookingRes.price * 100, 1000), 99999900),
            currency: 'thb',
        });



        const session = await stripe.checkout.sessions.create({
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: price.id,
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/bookings/${bookingId}/payment/success/${bookingRes.checkoutToken}`,
            cancel_url: `${process.env.FRONTEND_URL}/bookings/${bookingId}/payment`,
          });
        
          res.redirect(303, session.url);


    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    } 
  };