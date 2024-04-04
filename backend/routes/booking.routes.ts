import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken";
import { authenticateCustomer } from "../middlewares/authCustomer";
import { User } from "@prisma/client";
import { z } from "zod";
import { db } from "../lib/db";
import { authenticateProvider } from "../middlewares/authProvider";
import { bookStatus } from "../lib/constant";
import { refreshBookings } from "../lib/bookingRefresher";

import {getBooking , createBooking , updateBooking , deleteBooking , createCheckoutToken} from '../controller/booking.control'

const router = Router();

router.get("/:bookingId", authenticateToken, getBooking);  

router.post("/", authenticateToken, authenticateCustomer, createBooking);

router.put("/:bookingId",authenticateToken,authenticateProvider,updateBooking);

router.delete("/:bookingId", authenticateToken, deleteBooking);

router.post("/:bookingId/confirmpayment/:checkoutToken", createCheckoutToken);

export default router;
