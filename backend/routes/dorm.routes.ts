import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken";
import { authorizeProvider } from "../middlewares/authProvider";
import { z } from "zod";
import { dormFacilities, roomFacilities } from "../lib/constant";
import { db } from "../lib/db";
import { Dorm, User } from "@prisma/client";
import { refreshBookings } from "../lib/bookingRefresher";

import {getDorms , getDorm ,createDorm,updateDorm , deleteDorm , getBookingByRoomType , getRoomTypes , getRoomType , createRoomType , updateRoomType, deleteRoomType, createReview, getReviewsByDorm } from '../controller/dorm.control'
import { authorizeCustomer } from "../middlewares/authCustomer";

const router = Router();

router.get("/", getDorms);

// /**
// * @swagger
// * /dorms/{id}:
// *   get:
// *     summary: Get the dorm information by the dorm id
// *     tags: [Dorm]
// *     parameters:
// *       - in: path
// *         name: id
// *         schema:
// *           type: string
// *         required: true
// *         description: The dorm id
// *     responses:
// *       200:
// *         description: The requested dorm information
// *       404:
// *         description: The dorm was not found
// */

router.get("/:dormId", getDorm);

router.post("/", authenticateToken, authorizeProvider,createDorm);

router.put("/:dormId",authenticateToken,authorizeProvider,updateDorm);

router.delete("/:dormId",authenticateToken,authorizeProvider,deleteDorm);

router.get("/:dormId/roomtypes/:roomtypeId/booking",authenticateToken,authorizeProvider,getBookingByRoomType);

router.get("/:dormId/roomtypes", getRoomTypes);

router.get("/:dormId/roomtypes/:roomtypeId", getRoomType);

router.post("/:dormId/roomtypes",authenticateToken,authorizeProvider,createRoomType);

router.put("/:dormId/roomtypes/:roomtypeId",authenticateToken,authorizeProvider,updateRoomType);

router.delete("/:dormId/roomtypes/:roomtypeId",authenticateToken,authorizeProvider,deleteRoomType);

/**
* @swagger
* /dorms/{id}/reviews:
*   post:
*     summary: "Create review for this dorm [Roles: Customer]"
*     tags: [Dorm]
*     security:
*       - cookieAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the dorm
*     requestBody:
*       required: true
*       content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       rating:
*                           type: integer
*                           minimum: 1
*                           maximum: 5
*                           example: 3
*                       description:
*                           type: string
*                           example: "This dorm is very good bro!"
*                       images:
*                           type: array
*                           items:
*                               tyoe: string
*                           optional: true
*                           example: ["https://utfs.io/f/4a65c7f9-7bb1-4498-99bb-4148be482108-t9vzc5.png", "https://utfs.io/f/4a65c7f9-7bb1-4498-99bb-4148be482108-abcdefg.png"]
*     responses:
*       201:
*         description: The created review information    
*         content:
*           application/json:
*               schema:
*                 $ref: '#/components/schemas/Review'
*       400:
*         description: The review is in an invalid format
*         content:
*           application/json:
*               schema:
*                   type: array
*                   items:
*                       type: object
*                       properties:
*                           code:
*                               type: string
*                               example: too_big
*                           maximum:
*                               type: number
*                               example: 5
*                           type:
*                               type: string
*                               example: number
*                           inclusive:
*                               type: boolean
*                               example: true
*                           exact:
*                               type: boolean
*                               example: false
*                           message:
*                               type: string
*                               example: Rating should be between 1 to 5
*                           path:
*                               type: array
*                               items:
*                                   type: string
*                                   example: rating
*                                   description: Path to the property causing the error
*       401:
*         description: You have not logged in
*       403:
*         description: You haven't completely book this dorm or You have already reviewed this dorm
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 403
*                       message:
*                           type: string
*                           example: "Forbidden"
*                       error:
*                           type: string
*                           example: "You have reviewed this dorm already"
*       404:
*         description: The dorm with the provided dorm ID is not in the database
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 404
*                       message:
*                           type: string
*                           example: "Not Found"
*                       error:
*                           type: string
*                           example: "No dorm found"
*     
*/

router.post("/:dormId/reviews", authenticateToken, authorizeCustomer, createReview);

/**
* @swagger
* /dorms/{id}/reviews:
*   get:
*     summary: Get all reviews in this dorm
*     tags: [Dorm]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: ID of the dorm
*     responses:
*       200:
*         description: The list of reviews that customers have reviewed this dorm   
*         content:
*           application/json:
*               schema:
*                   type: array
*                   items:
*                       $ref: '#/components/schemas/Review'
*       404:
*         description: The dorm with the provided dorm ID is not in the database
*         content:
*           application/json:
*               schema:
*                   type: object
*                   properties:
*                       statusCode:
*                           type: integer
*                           example: 404
*                       message:
*                           type: string
*                           example: "Not Found"
*                       error:
*                           type: string
*                           example: "No dorm found"
*     
*/

router.get("/:dormId/reviews", getReviewsByDorm);

export default router;