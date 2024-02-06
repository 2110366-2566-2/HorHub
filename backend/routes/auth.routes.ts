import express, { Express, Request, Response } from "express";
import { Router } from "express";
import { generateJWT } from "../lib/jwtGenerator";
import { authenticateToken } from "../middlewares/authToken";

const router = Router()

router.get('/register', async (req, res) => {
    const user = req.body;
    const { name, email, password } = user;

    const token = generateJWT("1234", name, "hi")


    res.send({
        name: name,
        token: token
    })
})

router.get('/token', authenticateToken, async (req, res) => {
    res.send("Success")
})

export default router