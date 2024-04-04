import express, { Express, Request, Response } from "express";
import { Router } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import bcrypt from "bcrypt";
import { generateJWT } from "../lib/jwtGenerator";
import { authenticateToken } from "../middlewares/authToken";
import { authorizeProvider } from "../middlewares/authProvider";
import { User } from "@prisma/client";
import  { register , login , getUser, logout , update , verifyAccount , verifyAccountFail, getWallet, withdrawnMoney } from "../controller/auth.control"

 
const router = Router();

router.use(express.json());

const max_age = 3 * 24 * 60 * 60;

/**
* @swagger
* components:
*   securitySchemes:
*       cookieAuth:
*           type: apiKey
*           in: cookie
*           name: auth
*/

/**
* @swagger
* components:
*   schemas:
*     Review:
*       type: object
*       required:
*           - id
*           - customerId
*           - dormId
*           - rating
*           - description
*           - images
*           - reviewAt
*       properties:
*         id:
*           type: string
*           description: ID of the review
*           example: '194638c38ab20d7601f74e8294'
*         customerId:
*           description: ID of the customer who reviewed
*           type: string
*           example: '194638c38ab20d7601f74e8294'
*         dormId:
*           description: ID of the dorm where is reviewed
*           type: string
*           example: '194638c38ab20d7601f74e8294'
*         rating:
*           description: Rating score
*           type: integer
*           minimum: 1
*           maximum: 5
*           example: 3
*         description:
*           type: string
*           description: Description of this review
*           example: "This is very good"
*         images:
*           type: array
*           description: Array of image links
*           items:
*               tyoe: string
*           example: ["https://utfs.io/f/4a65c7f9-7bb1-4498-99bb-4148be482108-t9vzc5.png", "https://utfs.io/f/4a65c7f9-7bb1-4498-99bb-4148be482108-abcdefg.png"]
*         reviewAt:
*           type: string
*           format: date-time
*           description: Date and time that the customer reviewed
*           example: "2017-07-21T17:32:28Z"
*/



// /**
// * @swagger
// * components:
// *   schemas:
// *     User:
// *       type: object
// *       required:
// *         - email
// *         - password
// *         - firstName
// *         - lastName
// *         - displayName
// *         - phoneNumber
// *         - birthDate
// *         - gender
// *         - role
// *       properties:
// *         email:
// *           type: string
// *           example: 'example@gmail.com'
// *         password:
// *           type: string
// *         firstName:
// *           type: string
// *           description: Firstname of user
// *         lastName:
// *           type: string
// *           description: Lastname of user
// *         displayName:
// *           type: string
// *           description: Display name of user
// *         phoneNumber:
// *           type: string
// *           example: '0981234567'
// *           description: Phone number of user
// *         birthDate:
// *           type: string
// *           example: '2023-09-20'
// *           description: Birthdate of user
// *         gender:
// *           type: string
// *           example: 'Male'
// *           description: Male, Female or Other
// *         role:
// *           type: string
// *           example: 'Customer'
// *           description: Customer or Provider
// */

// /**
// * @swagger
// * /auth/register:
// *   post:
// *     summary: Register a user
// *     tags: [Authentication]
// *     requestBody:
// *       required: true
// *       content:
// *         application/json:
// *           schema:
// *             $ref: '#/components/schemas/User'
// *     responses:
// *       201:
// *         description: The user was successfully registered
// *       400:
// *         description: User registration failed
// */

router.post("/register", register);

router.post("/login", login);

router.get("/user", authenticateToken, getUser);

router.post("/logout", authenticateToken, logout);

router.put("/user", authenticateToken, update);

router.post("/verify", verifyAccount);

router.post("/verify/fail", authenticateToken, verifyAccountFail);

router.get("/wallet", authenticateToken,authorizeProvider,getWallet);

router.post("/withdrawn",authenticateToken,authorizeProvider,withdrawnMoney);

export default router;