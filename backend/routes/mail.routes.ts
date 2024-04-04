import express, { Express, Request, Response } from "express";
import { Router } from "express";
import { DataSender, Schema_DataSender, sender } from "../lib/mail_sender";
import { authenticateToken } from "../middlewares/authToken";
import { User } from "@prisma/client";

import {sendEmail , sendVerificationEmail} from '../controller/mail.control'

const router = Router();

router.post("/verification",authenticateToken,sendVerificationEmail);

router.post("/send", sendEmail);

export default router;
