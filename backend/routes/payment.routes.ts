import { Router } from "express";
import { db } from "../lib/db";
import { authenticateToken } from "../middlewares/authToken";
import { authenticateCustomer } from "../middlewares/authCustomer";
import { User } from "@prisma/client";
import {getReceipt , createCheckoutSession , createPaymentIntent}  from '../controller/payment.control'

const router = Router();

router.get("/receipt/:bookingId",authenticateToken,authenticateCustomer,getReceipt);

router.post("/create-payment-intent", createPaymentIntent);

router.post('/create-checkout-session/:bookingId', createCheckoutSession);

export default router