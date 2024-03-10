import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken";
import { authenticateCustomer } from "../middlewares/authCustomer";
import { User } from "@prisma/client";
import { z } from "zod";

const router = Router();

const bookingSchema = z.object({
    roomTypeId: z.string(),
    startAt: z.coerce.date().refine((data) => data >= new Date(), { message: "Past is not accepted" }),
})

router.post("/", authenticateToken, authenticateCustomer, async (req, res) => {
    const user: User = req.body.user
    delete req.body.user
    const body = req.body


})


export default router