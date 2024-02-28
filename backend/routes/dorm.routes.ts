import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken";
import { authenticateProvider } from "../middlewares/authProvider";
import { z } from "zod";
import { dormFacilities } from "../lib/constant";
import { db } from "../lib/db";

const router = Router();

const dormSchema = z.object({
    name: z.string().trim().min(1, {message: "Fill dorm name"}).max(100, {message: "Your dorm name must not exceed 100 characters"}),
    description: z.string().trim().min(1, {message: "Fill description"}).max(5000, {message: "Description must not exceed 5000 characters"}),
    contractNumber: z.string().trim().refine((value) => /^[0-9]{9,10}$/.test(value), {message: 'Please fill valid number'}),
    images: z.string().array().max(10, {message: "The images must not exceed 10 files"}),
    address: z.string().trim().min(1, {message: "Fill dorm address"}).max(300, {message: "Address must not exceed 300 characters"}),
    latitude: z.coerce.number().min(-90.00000, {message: "The value must be between -90.00000 to 90.00000"}).max(90.00000, {message: "The value must be between -90.00000 to 90.00000"}),
    longitude: z.coerce.number().min(-180.00000, {message: "The value must be between -180.00000 to 180.00000"}).max(180.00000, {message: "The value must be between -180.00000 to 180.00000"}),
    dormFacilities: z.enum(dormFacilities).array()
})

router.post("/", authenticateToken, authenticateProvider, async (req, res) => {
    const body = req.body
    
    const parseStatus = dormSchema.safeParse(body)
    if (!parseStatus.success) console.log(parseStatus.error.issues);
    if (!parseStatus.success) return res.status(403).send("Invalid Data")
    
    console.log(body)
    const createRes = await db.dorm.create({
        data: {
            providerId: body.user.id,
            name: body.name,
            description: body.description,
            contractNumber: body.contractNumber,
            images: body.images,
            address: body.address,
            latitude: body.latitude,
            longitude: body.longitude,
            dormFacilities: body.dormFacilities
        }
    })

    return res.send(createRes)

})



export default router