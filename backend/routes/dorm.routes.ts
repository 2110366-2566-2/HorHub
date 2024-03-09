import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken";
import { authenticateProvider } from "../middlewares/authProvider";
import { z } from "zod";
import { dormFacilities, roomFacilities } from "../lib/constant";
import { db } from "../lib/db";
import { Dorm, User } from "@prisma/client";

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

const optionalDormSchema = z.object({
    name: z.string().trim().min(1, {message: "Fill dorm name"}).max(100, {message: "Your dorm name must not exceed 100 characters"}).optional(),
    description: z.string().trim().min(1, {message: "Fill description"}).max(5000, {message: "Description must not exceed 5000 characters"}).optional(),
    contractNumber: z.string().trim().refine((value) => /^[0-9]{9,10}$/.test(value), {message: 'Please fill valid number'}).optional(),
    images: z.string().array().max(10, {message: "The images must not exceed 10 files"}).optional(),
    address: z.string().trim().min(1, {message: "Fill dorm address"}).max(300, {message: "Address must not exceed 300 characters"}).optional(),
    latitude: z.coerce.number().min(-90.00000, {message: "The value must be between -90.00000 to 90.00000"}).max(90.00000, {message: "The value must be between -90.00000 to 90.00000"}).optional(),
    longitude: z.coerce.number().min(-180.00000, {message: "The value must be between -180.00000 to 180.00000"}).max(180.00000, {message: "The value must be between -180.00000 to 180.00000"}).optional(),
    dormFacilities: z.enum(dormFacilities).array().optional()
})

const roomTypeSchema = z.object({
    name: z.string().trim().min(1, {message: "Fill dorm name"}).max(100, {message: "Your room name must not exceed 100 characters"}),
    description: z.string().trim().min(1, {message: "Fill description"}).max(5000, {message: "Description must not exceed 5000 characters"}),
    images: z.string().array().max(5, {message: "The images must not exceed 5 files"}),
    size: z.coerce.number().min(1, {message: "Fill valid size in unit of square meter"}),
    cost: z.coerce.number().multipleOf(0.01, {message: "Fill valid cost in 2 decimal places"}).min(0.01, {message: "Fill valid cost in 2 decimal places"}),
    capacity: z.coerce.number().min(1, {message: "Fill valid room capacity"}),
    roomFacilities: z.enum(roomFacilities).array()
})

const UpdateRoomTypeSchema = z.object({
    name: z.string().trim().min(1, {message: "Fill dorm name"}).max(100, {message: "Your room name must not exceed 100 characters"}).optional(),
    description: z.string().trim().min(1, {message: "Fill description"}).max(5000, {message: "Description must not exceed 5000 characters"}).optional(),
    images: z.string().array().max(5, {message: "The images must not exceed 5 files"}).optional(),
    size: z.coerce.number().min(1, {message: "Fill valid size in unit of square meter"}).optional(),
    cost: z.coerce.number().multipleOf(0.01, {message: "Fill valid cost in 2 decimal places"}).min(0.01, {message: "Fill valid cost in 2 decimal places"}).optional(),
    capacity: z.coerce.number().min(1, {message: "Fill valid room capacity"}).optional(),
    roomFacilities: z.enum(roomFacilities).array().optional(),
    numberOfRoom: z.coerce.number().min(0, {message: "Fill valid number of room"}).optional(),
    numberOfAvailableRoom: z.coerce.number().min(0, {message: "Fill valid number of room"}).optional(),
})

type UpdateDormType = z.infer<typeof optionalDormSchema>



// Without pagination and filtering/sorting
router.get("/", async (req, res) => {
    const allDormsRes = await db.dorm.findMany()

    return res.send(allDormsRes)
})


router.get("/:dormId", async (req, res) => {
    const { dormId } = req.params

    if (dormId.length != 24 || /[0-9A-Fa-f]{24}/g.test(dormId) === false) {
        return res.status(404).send("No dorm found")
    }

    const findDormRes = await db.dorm.findUnique({
        where: {
            id: dormId
        },
        include: {
            roomTypes: true
        }
    })

    if (!findDormRes) {
        return res.status(404).send("No dorm found")
    }

    return res.send(findDormRes)
})




router.post("/", authenticateToken, authenticateProvider, async (req, res) => {
    const body = req.body
    
    const parseStatus = dormSchema.safeParse(body)
    if (!parseStatus.success) console.log(parseStatus.error.issues);
    if (!parseStatus.success) return res.status(400).send("Invalid Data")
    
    // console.log(body)
    try {
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
    }
    catch (err) {
        return res.status(400).send(err)
    }

})


router.put("/:dormId", authenticateToken, authenticateProvider, async (req, res) => {
    const { dormId } = req.params

    const user: User = req.body.user
    delete req.body.user
    const body: UpdateDormType = req.body

    
    const parseStatus = optionalDormSchema.safeParse(body)
    if (!parseStatus.success) console.log(parseStatus.error.issues);
    if (!parseStatus.success) return res.status(400).send("Invalid Data")

    if (dormId.length != 24 || /[0-9A-Fa-f]{24}/g.test(dormId) === false) {
        return res.status(404).send("No dorm found")
    }

    // Find this dorm
    const findDormRes = await db.dorm.findUnique({
        where: {
            id: dormId
        }
    })

    if (!findDormRes) {
        return res.status(400).send("No dorm found")
    }

    // Check if user is owner
    if (findDormRes.providerId != user.id) {
        return res.status(403).send("You don't have access to manage this dorm")
    }

    // Try to update dorm
    try {
        const updateRes = await db.dorm.update({
            where: {
                id: dormId
            },
            data: body
        })
    
        return res.send(updateRes)
    }
    catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }
})



router.delete("/:dormId", authenticateToken, authenticateProvider, async (req, res) => {
    const { dormId } = req.params

    const user: User = req.body.user
    delete req.body.user

    if (dormId.length != 24 || /[0-9A-Fa-f]{24}/g.test(dormId) === false) {
        return res.status(404).send("No dorm found")
    }
    
    // Find this dorm
    const findDormRes = await db.dorm.findUnique({
        where: {
            id: dormId
        }
    })

    if (!findDormRes) {
        return res.status(400).send("No dorm found")
    }

    // Check if user is owner
    if (findDormRes.providerId != user.id) {
        return res.status(400).send("You don't have access to manage this dorm")
    }


    // Try to delete dorm
    try {
        const deleteRes = await db.dorm.delete({
            where: {
                id: dormId
            }
        })
    
        return res.send("Success")
    }
    catch (err) {
        return res.status(400).send(err)
    }
})


router.post("/:dormId/roomtypes", authenticateToken, authenticateProvider, async (req, res) => {
    const { dormId } = req.params

    const user: User = req.body.user
    delete req.body.user
    const body = req.body

    const parseStatus = roomTypeSchema.safeParse(body)
    if (!parseStatus.success) console.log(parseStatus.error.issues);
    if (!parseStatus.success) return res.status(400).send("Invalid Data")

    const parsedBody = parseStatus.data

    try {
        const findDormRes = await db.dorm.findUnique({
            where: {
                id: dormId
            }
        })

        if (!findDormRes) {
            return res.status(404).send("No dorm found")
        }

        if (findDormRes.providerId != user.id) {
            return res.status(403).send("You don't have access to manage this dorm")
        }

        const createRes = await db.roomType.create({
            data: {
                ...parsedBody,
                dormId: dormId
            }
        })

        return res.send(createRes)
    }
    catch (err) {
        res.status(404).send(err)
    }
})

router.put("/:dormId/roomtypes/:roomtypeId", authenticateToken, authenticateProvider, async (req, res) => {
    const { dormId, roomtypeId } = req.params

    const user: User = req.body.user
    delete req.body.user
    const body = req.body

    const parseStatus = UpdateRoomTypeSchema.safeParse(body)
    if (!parseStatus.success) console.log(parseStatus.error.issues);
    if (!parseStatus.success) return res.status(400).send("Invalid Data")

    const parsedBody = parseStatus.data

    try {
        const findDormRes = await db.dorm.findUnique({
            where: {
                id: dormId
            }
        })

        if (!findDormRes) {
            return res.status(404).send("No dorm found")
        }

        if (findDormRes.providerId != user.id) {
            return res.status(403).send("You don't have access to manage this dorm")
        }

        const findRoomRes = await db.roomType.findUnique({
            where: {
                id: roomtypeId
            }
        })

        if (!findRoomRes) {
            return res.status(404).send("No room found")
        }

        const updateRes = await db.roomType.update({
            where: {
                id: roomtypeId
            },
            data: {
                ...parsedBody
            }
        })

        return res.send(updateRes)
    }
    catch (err) {
        res.status(404).send(err)
    }
})

router.delete("/:dormId/roomtypes/:roomtypeId", authenticateToken, authenticateProvider, async (req, res) => {
    const { dormId, roomtypeId } = req.params

    const user: User = req.body.user

    try {
        const findDormRes = await db.dorm.findUnique({
            where: {
                id: dormId
            }
        })

        if (!findDormRes) {
            return res.status(404).send("No dorm found")
        }

        if (findDormRes.providerId != user.id) {
            return res.status(403).send("You don't have access to manage this dorm")
        }

        const findRoomRes = await db.roomType.findUnique({
            where: {
                id: roomtypeId
            }
        })

        if (!findRoomRes) {
            return res.status(404).send("No room found")
        }

        const deleteRes = await db.roomType.delete({
            where: {
                id: roomtypeId
            }
        })

        return res.send("Success")
    }
    catch (err) {
        res.status(404).send(err)
    }
})

export default router