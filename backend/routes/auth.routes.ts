import express, { Express, Request, Response } from "express";
import { Router } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import bcrypt from "bcrypt";
import { generateJWT } from "../lib/jwtGenerator";
import { authenticateToken } from "../middlewares/authToken";
import { authenticateProvider } from "../middlewares/authProvider";
import { User } from "@prisma/client";

const {register , login , getUser, logout , update , verifyAccount , verifyAccountFail} = require('../controller/auth.control')

const {getWallet , withdrawnMoney} = require('../controller/auth.control') 
 
const router = Router();

router.use(express.json());

const max_age = 3 * 24 * 60 * 60;

router.post("/register", register);

router.post("/login", login);

router.get("/user", authenticateToken, getUser);

router.post("/logout", authenticateToken, logout);

router.put("/user", authenticateToken, update);

router.post("/verify", verifyAccount);

router.post("/verify/fail", authenticateToken, verifyAccountFail);

router.get("/wallets", authenticateToken,authenticateProvider,getWallet);

router.post("/withdrawn",authenticateToken,authenticateProvider,withdrawnMoney);

export default router;
