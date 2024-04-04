import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken";
import { authenticateProvider } from "../middlewares/authProvider";
import { z } from "zod";
import { dormFacilities, roomFacilities } from "../lib/constant";
import { db } from "../lib/db";
import { Dorm, User } from "@prisma/client";
import { refreshBookings } from "../lib/bookingRefresher";

import {getDorms , getDorm ,createDorm,updateDorm , deleteDorm , getBookingByRoomType , getRoomTypes , getRoomType , createRoomType , updateRoomType, deleteRoomType } from '../controller/dorm.control'

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

router.get("/:dormId",getDorm);

router.post("/", authenticateToken, authenticateProvider,createDorm);

router.put("/:dormId",authenticateToken,authenticateProvider,updateDorm);

router.delete("/:dormId",authenticateToken,authenticateProvider,deleteDorm);

router.get("/:dormId/roomtypes/:roomtypeId/booking",authenticateToken,authenticateProvider,getBookingByRoomType);

router.get("/:dormId/roomtypes", getRoomTypes);

router.get("/:dormId/roomtypes/:roomtypeId", getRoomType);

router.post("/:dormId/roomtypes",authenticateToken,authenticateProvider,createRoomType);

router.put("/:dormId/roomtypes/:roomtypeId",authenticateToken,authenticateProvider,updateRoomType);

router.delete("/:dormId/roomtypes/:roomtypeId",authenticateToken,authenticateProvider,deleteRoomType);

export default router;