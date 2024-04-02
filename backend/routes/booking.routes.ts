import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken";
import { authenticateCustomer } from "../middlewares/authCustomer";
import { User } from "@prisma/client";
import { z } from "zod";
import { db } from "../lib/db";
import { authenticateProvider } from "../middlewares/authProvider";
import { bookStatus } from "../lib/constant";
import { refreshBookings } from "../lib/bookingRefresher";

const {getBooking , createBooking , updateBooking , deleteBooking , createCheckoutToken} = require('../controller/booking.control')

const router = Router();

const bookingSchema = z
  .object({
    roomTypeId: z.string(),
    startAt: z.coerce.date().refine((data) => data > new Date(), {
      message: "This should not be before tomorrow",
    }),
    endAt: z.coerce.date(),
    price: z.coerce
      .number()
      .min(0.01, { message: "Please fill valid price of this booking" })
      .multipleOf(0.01, { message: "Please fill valid price of this booking" }),
  })
  .refine((data) => data.startAt <= data.endAt, {
    path: ["endAt"],
    message: "This should be after or at starting date",
  });

const bookUpdateSchema = z.object({
  status: z.enum(["Cancelled", "PaymentPending", "Confirmed"]),
});

router.get("/:bookingId", authenticateToken, getBooking);
router.post("/", authenticateToken, authenticateCustomer, createBooking);
router.put("/:bookingId",authenticateToken,authenticateProvider,updateBooking);
router.delete("/:bookingId", authenticateToken, deleteBooking);
router.post("/:bookingId/confirmpayment/:checkoutToken", createCheckoutToken);

export default router;
