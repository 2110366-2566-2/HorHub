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


export default router