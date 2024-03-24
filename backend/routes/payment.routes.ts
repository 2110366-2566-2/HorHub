import { Router } from "express";
import { db } from "../lib/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const router = Router();

router.post("/create-payment-intent", async (req, res) => {
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
  
});


router.post('/create-checkout-session/:bookingId', async (req, res) => {

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
            unit_amount: bookingRes.price * 100,
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


    
  });





export default router