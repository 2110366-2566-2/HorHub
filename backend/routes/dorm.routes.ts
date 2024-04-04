import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken";
import { authenticateProvider } from "../middlewares/authProvider";
import { z } from "zod";
import { dormFacilities, roomFacilities } from "../lib/constant";
import { db } from "../lib/db";
import { Dorm, User } from "@prisma/client";
import { refreshBookings } from "../lib/bookingRefresher";

import {getDorms , getDorm ,createDorm,updateDorm , deleteDorm , getBookingByRoomType , getRoomTypes , getRoomType , createRoomType , updateRoomType, deleteRoomType, createReview } from '../controller/dorm.control'
import { authenticateCustomer } from "../middlewares/authCustomer";

const router = Router();

router.get("/", getDorms);

/**
* @swagger
* /dorms/{id}:
*   get:
*     summary: Get the dorm information by the dorm id
*     tags: [Dorm]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The dorm id
*     responses:
*       200:
*         description: The requested dorm information
*       404:
*         description: The dorm was not found
*/

router.get("/:dormId", getDorm);

router.post("/", authenticateToken, authenticateProvider,createDorm);

router.put("/:dormId",authenticateToken,authenticateProvider,updateDorm);

router.delete("/:dormId",authenticateToken,authenticateProvider,deleteDorm);

router.get("/:dormId/roomtypes/:roomtypeId/booking",authenticateToken,authenticateProvider,getBookingByRoomType);

router.get("/:dormId/roomtypes", getRoomTypes);

router.get("/:dormId/roomtypes/:roomtypeId", getRoomType);

router.post("/:dormId/roomtypes",authenticateToken,authenticateProvider,createRoomType);

router.put("/:dormId/roomtypes/:roomtypeId",authenticateToken,authenticateProvider,updateRoomType);

router.delete("/:dormId/roomtypes/:roomtypeId",authenticateToken,authenticateProvider,deleteRoomType);

/**
* @swagger
* /dorms/{id}/reviews:
*   post:
*     summary: Create review for this dorm
*     tags: [Dorm]
*     security:
*       - cookieAuth: []
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The dorm id
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
*       200:
*         description: The created review information    
*         content:
*           application/json:
*               schema:
*                 $ref: '#/components/schemas/Review'
*       400:
*         description: The body is invalid
*       401:
*         description: Unauthorized
*       403:
*         description: There is no permission to access this path
*       404:
*         description: The dorm is invalid
*     
*/

router.post("/:dormId/reviews", authenticateToken, authenticateCustomer, createReview);

export default router;