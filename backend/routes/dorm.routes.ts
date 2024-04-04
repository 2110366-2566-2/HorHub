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

// Without pagination and filtering/sorting
router.get("/", getDorms);

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
