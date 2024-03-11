import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken";
import { authenticateCustomer } from "../middlewares/authCustomer";
import { User } from "@prisma/client";
import { z } from "zod";
import { db } from "../lib/db";

const router = Router();

const bookingSchema = z.object({
    roomTypeId: z.string(),
    startAt: z.coerce.date().refine((data) => data > new Date(), { message: "This should not be before tomorrow" }),
    endAt: z.coerce.date(),
    price: z.coerce.number().min(0.01, {message: "Please fill valid price of this booking"}).multipleOf(0.01, {message: "Please fill valid price of this booking"})
}).refine((data) => data.startAt <= data.endAt, {
    path: ['endAt'],
    message: 'This should be after or at starting date'
  })

router.post("/", authenticateToken, authenticateCustomer, async (req, res) => {
    const user: User = req.body.user
    delete req.body.user
    const body = req.body

    const parseStatus = bookingSchema.safeParse(body)
    if (!parseStatus.success) console.log(parseStatus.error.issues);
    if (!parseStatus.success) return res.status(400).send("Invalid Data")

    const parsedBody = parseStatus.data

    try {
        // Check if this room is available
        if (parsedBody.roomTypeId.length != 24 || /[0-9A-Fa-f]{24}/g.test(parsedBody.roomTypeId) === false) {
            return res.status(404).send("No room found")
        }

        const findRoomRes = await db.roomType.findUnique({
            where: {
                id: parsedBody.roomTypeId
            }
        })

        if (!findRoomRes) {
            return res.status(404).send("No room found")
        }

        // Create booking

        const bookingRes = await db.booking.create({
            data: {
                ...parsedBody,
                customerId: user.id
            }
        })

        return res.send(bookingRes)
    }
    catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }

})


router.delete("/:bookingId", authenticateToken, async (req, res) => {
    const { bookingId } = req.params

    const user: User = req.body.user
    delete req.body.user

    try {
        // Check if this booking is available
        if (bookingId.length != 24 || /[0-9A-Fa-f]{24}/g.test(bookingId) === false) {
            return res.status(404).send("No booking found")
        }

        const findBookingRes = await db.booking.findUnique({
            where: {
                id: bookingId
            },
            include: {
                roomType: {
                    include: {
                        dorm: true
                    }
                }
            }
        })

        if (!findBookingRes) {
            return res.status(404).send("No booking found")
        }

        // Check if user have authority to manage
        if (!(findBookingRes.customerId === user.id || findBookingRes.roomType.dorm.providerId === user.id)) {
            return res.status(403).send("You don't have access to manage this booking")
        }

        const deleteRes = await db.booking.delete({
            where: {
                id: bookingId
            }
        })

        return res.send("Success")
    }
    catch (err) {
        return res.status(400).send(err)
    }
})


export default router