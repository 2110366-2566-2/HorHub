import { Router } from "express";
import { db } from "../lib/db";
import { authenticateToken } from "../middlewares/authToken";
import { authenticateCustomer } from "../middlewares/authCustomer";
import { User } from "@prisma/client";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {getReceipt , createCheckoutSession , createPaymentIntent} = require('../controller/payment.control')

const router = Router();

router.get("/receipt/:bookingId",authenticateToken,authenticateCustomer,getReceipt);

router.post("/create-payment-intent", createPaymentIntent);

router.post('/create-checkout-session/:bookingId', createCheckoutSession);

export default router