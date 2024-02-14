import express, { Express, Request, Response } from "express";
import { Router } from "express";
import { db } from "../lib/db";
import { authenticateToken } from "../middlewares/authToken";
import { z } from "zod";
import bcrypt from 'bcrypt';
import { supportBankName } from "../lib/constant";

const router = Router();

const userChangePasswordSchema = z.object({
    oldPassword: z.string().trim().min(1, {message: 'Please fill this field'}),
    newPassword: z.string().trim().min(8, {message: 'Password must be at least 8 characters'}),
})

const createPaymentMethodSchema = z.object({
    type: z.enum(["Bank", "Card"], {invalid_type_error: 'Method type is not valid'}),
    info: z.string().trim().min(1)
}).refine(({type, info}) => {
    const bankName = info.split("-")[0]
    const bankNumber = info.split("-")[1]
    if (type === "Bank") {
        if (!supportBankName.includes(bankName)) {
            return false
        }
        if (!(/[0-9]{10}/.test(bankNumber))) {
            return false
        }
        
    }
    else if (type === "Card") {
        if (info.length !== 16) {
            return false
        }
    }
    return true
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

router.delete("/:id", authenticateToken, async (req, res) => {
    const { id } = req.params

    const body = req.body

    if (id != body.user.id) {
        return res.status(401).send("Unauthorized")
    }

    const isMatch = await bcrypt.compare(body.password,body.user.password);

    if (!isMatch) {
        return res.status(400).send("Password is wrong")
    }

    const deleteRes = await db.user.delete({
        where: {
            id: id
        }
    })

    if (deleteRes) {
        return res.send("Success")
    }
    else {
        return res.status(400).send("Something went wrong")
    }
    

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

router.post("/:id/paymentMethods", authenticateToken, async (req, res) => {
    const { id } = req.params

    const body = req.body

    if (id != body.user.id) {
        return res.status(401).send("Unauthorized")
    }

    const parseStatus = createPaymentMethodSchema.safeParse(req.body)
    if(!parseStatus.success) console.log(parseStatus.error);
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
            type: data.type,
            info: data.info
        }
    })

    console.log(countMethod)

    if (countMethod !== 0) {
        return res.status(400).send("Duplicate method")
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

router.put("/:id/paymentMethods/:methodId",authenticateToken, async (req, res) => {
    const { id, methodId } = req.params

    const body = req.body

    if (id != body.user.id) {
        return res.status(401).send("Unauthorized")
    }

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

router.delete("/:id/paymentMethods/:methodId", async (req, res) => {
    const { id, methodId } = req.params

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

    const deleteRes = await db.paymentMethod.delete({
        where: {
            id: methodId
        }
    })

    return res.send(deleteRes)
})


export default router