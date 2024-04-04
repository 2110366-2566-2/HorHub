import express, { Express, Request, Response } from "express";
import { Router } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import bcrypt from "bcrypt";
import { generateJWT } from "../lib/jwtGenerator";
import { authenticateToken } from "../middlewares/authToken";
import { authenticateProvider } from "../middlewares/authProvider";
import { User } from "@prisma/client";
import  { register , login , getUser, logout , update , verifyAccount , verifyAccountFail, getWallet, withdrawnMoney } from "../controller/auth.control"

 
const router = Router();

router.use(express.json());

const max_age = 3 * 24 * 60 * 60;

/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         - email
*         - password
*         - firstName
*         - lastName
*         - displayName
*         - phoneNumber
*         - birthDate
*         - gender
*         - role
*       properties:
*         email:
*           type: string
*           example: 'example@gmail.com'
*         password:
*           type: string
*         firstName:
*           type: string
*           description: Firstname of user
*         lastName:
*           type: string
*           description: Lastname of user
*         displayName:
*           type: string
*           description: Display name of user
*         phoneNumber:
*           type: string
*           example: '0981234567'
*           description: Phone number of user
*         birthDate:
*           type: string
*           example: '2023-09-20'
*           description: Birthdate of user
*         gender:
*           type: string
*           example: 'Male'
*           description: Male, Female or Other
*         role:
*           type: string
*           example: 'Customer'
*           description: Customer or Provider
*/

/**
* @swagger
* /auth/register:
*   post:
*     summary: Register a user
*     tags: [Authentication]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       201:
*         description: The user was successfully registered
*       400:
*         description: User registration failed
*/

router.post("/register", register);

router.post("/login", login);

router.get("/user", authenticateToken, getUser);

router.post("/logout", authenticateToken, logout);

router.put("/user", authenticateToken, update);

router.post("/verify", verifyAccount);

router.post("/verify/fail", authenticateToken, verifyAccountFail);

router.get("/wallet", authenticateToken,authenticateProvider,getWallet);

router.post("/withdrawn",authenticateToken,authenticateProvider,withdrawnMoney);

export default router;