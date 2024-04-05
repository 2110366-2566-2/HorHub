import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken";
import { authorizeProvider } from "../middlewares/authProvider";
import { z } from "zod";
import { dormFacilities, roomFacilities } from "../lib/constant";
import { db } from "../lib/db";
import { Dorm, User } from "@prisma/client";
import { refreshBookings } from "../lib/bookingRefresher";

import {
  getDorms,
  getDorm,
  createDorm,
  updateDorm,
  deleteDorm,
  getBookingByRoomType,
  getRoomTypes,
  getRoomType,
  createRoomType,
  updateRoomType,
  deleteRoomType,
  createReview,
  getReviewsByDorm,
} from "../controller/dorm.control";
import { authorizeCustomer } from "../middlewares/authCustomer";

const router = Router();

import reviewRouter from "./review.routes";

router.use("/:dormId/reviews/", reviewRouter);

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

router.post("/", authenticateToken, authorizeProvider, createDorm);

router.put("/:dormId", authenticateToken, authorizeProvider, updateDorm);

router.delete("/:dormId", authenticateToken, authorizeProvider, deleteDorm);

router.get(
  "/:dormId/roomtypes/:roomtypeId/booking",
  authenticateToken,
  authorizeProvider,
  getBookingByRoomType
);

router.get("/:dormId/roomtypes", getRoomTypes);

router.get("/:dormId/roomtypes/:roomtypeId", getRoomType);

router.post(
  "/:dormId/roomtypes",
  authenticateToken,
  authorizeProvider,
  createRoomType
);

router.put(
  "/:dormId/roomtypes/:roomtypeId",
  authenticateToken,
  authorizeProvider,
  updateRoomType
);

router.delete(
  "/:dormId/roomtypes/:roomtypeId",
  authenticateToken,
  authorizeProvider,
  deleteRoomType
);

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
 *         description: The dorm is invalid
 *
 */

router.get("/:dormId/reviews", getReviewsByDorm);

export default router;
