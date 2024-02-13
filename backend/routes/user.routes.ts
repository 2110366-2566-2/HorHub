import express, { Express, Request, Response } from "express";
import { Router } from "express";
import { db } from "../lib/db";
import { authenticateToken } from "../middlewares/authToken";
import { z } from "zod";
import bcrypt from 'bcrypt';

const router = Router();

const userChangePasswordSchema = z.object({
    oldPassword: z.string().trim().min(1, {message: 'Please fill this field'}),
    newPassword: z.string().trim().min(8, {message: 'Password must be at least 8 characters'}),
})

const createPaymentMethodSchema = z.object({
    type: z.enum(["Bank", "Card"], {invalid_type_error: 'Method type is not valid'}),
    info: z.string().trim().min(1)
})


router.get("/:id", async (req, res) => {
    const { id } = req.params
    
    const user = await db.user.findUnique({
        where: {
            id: id
        }
    })

    if (!user) {
        res.status(404).send("User not found")
        return
    }

    res.send(user)
})

router.put("/:id/password", authenticateToken, async (req, res) => {
    const { id } = req.params

    const body = req.body

    if (id != body.user.id) {
        return res.status(401).send("Unauthorized")
    }

    const isMatch = await bcrypt.compare(body.oldPassword,body.user.password);

    if (!isMatch) {
        return res.status(400).send("Old password is wrong")
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(body.newPassword,salt);

        const changeRes = await db.user.update({
            where: {
                id: id
            },
            data: {
                password: hashedNewPassword
            }
        })

        return res.send("Success")
    }
    catch (err) {
        return res.status(400).send(err)
    }
})

router.get("/:id/paymentMethods", async (req, res) => {
    const { id } = req.params

    const results = await db.paymentMethod.findMany({
        where: {
            userId: id
        }
    })

    return res.send(results)
})

router.post("/:id/paymentMethods", async (req, res) => {
    const { id } = req.params

    const parseStatus = createPaymentMethodSchema.safeParse(req.body)
    if (!parseStatus.success) return res.status(403).send("Invalid Data")

    const data = parseStatus.data

    const userQuery = await db.user.findUnique({
        where: {
            id: id
        }
    })

    if (!userQuery) {
        return res.status(400).send("No user found")
    }

    const paymentResponse = await db.paymentMethod.create({
        data: {
            userId: id,
            type: data.type,
            info: data.info
        }
    })

    return res.send(paymentResponse)
})

router.put("/:id/paymentMethods/:methodId", async (req, res) => {
    const { id, methodId } = req.params

    const parseStatus = createPaymentMethodSchema.safeParse(req.body)
    if (!parseStatus.success) return res.status(403).send("Invalid Data")

    const data = parseStatus.data

    const userQuery = await db.user.findUnique({
        where: {
            id: id
        }
    })

    if (!userQuery) {
        return res.status(400).send("No user found")
    }

    const countMethod = await db.paymentMethod.count({
        where: {
            id: methodId
        }
    })

    if (countMethod === 0) {
        return res.status(400).send("No payment method found")
    }

    const methodResponse = await db.paymentMethod.update({
        where: {
            id: methodId
        },
        data: {
            type: data.type,
            info: data.info
        }
    })

    return res.send(methodResponse)
})


export default router