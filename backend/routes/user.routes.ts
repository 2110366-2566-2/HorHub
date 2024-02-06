import express, { Express, Request, Response } from "express";
import { Router } from "express";
import { db } from "../lib/db";

const router = Router();


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


export default router