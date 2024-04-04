import express, { Express, Request, Response } from "express";
import { Router } from "express";
import { db } from "../lib/db";
import { authenticateToken } from "../middlewares/authToken";
import { z } from "zod";
import bcrypt from "bcrypt";
import { supportBankName } from "../lib/constant";

import { DataSender, Schema_DataSender, sender } from "../lib/mail_sender";
import { authorizeProvider } from "../middlewares/authProvider";
import { authorizeCustomer } from "../middlewares/authCustomer";
import { refreshBookings } from "../lib/bookingRefresher";
import { User } from "@prisma/client";

import {getUser , deleteUser, updatePassword , getPaymentMethod , createNewPaymentMethod , updatePaymentMethod , deletePaymentMethod , getProvidedDorm , getInfoBeforePaying , getBookings , getChats , sendChangingEmailConfirmation} from '../controller/user.control'

const router = Router();

router.get("/:id", getUser);

router.delete("/:id", authenticateToken, deleteUser);

router.put("/:id/password", authenticateToken, updatePassword);

router.get("/:id/paymentMethods", getPaymentMethod);

router.post("/:id/paymentMethods", authenticateToken, createNewPaymentMethod);

router.put("/:id/paymentMethods/:methodId",authenticateToken,updatePaymentMethod);

router.delete("/:id/paymentMethods/:methodId",authenticateToken,deletePaymentMethod);

router.get("/:id/dorms",authenticateToken,authorizeProvider,getProvidedDorm);

router.get("/:bookingId/payment/bookings/",authenticateToken,authorizeCustomer,getInfoBeforePaying);

router.get("/:id/bookings",authenticateToken,authorizeCustomer,getBookings);

router.get("/:id/chats", authenticateToken,getChats);

// ===================================== NINE will try his best
router.put("/:id/email", sendChangingEmailConfirmation);

export default router;
