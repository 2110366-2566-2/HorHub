import { Router } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import { authenticateToken } from "../middlewares/authToken";
import { io } from "..";

const router = Router();

const createRoomBodySchema = z.object({
    participantAId: z.string(),
    participantBId: z.string()
})

router.get('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params

    const user = req.body.user

    if (id.length != 24 || /[0-9A-Fa-f]{24}/g.test(id) === false) {
        return res.status(404).send("No chat found")
    }

    try {

        // Check if chat is valid
        const chatRes = await db.chat.findUnique({
            where: {
                id: id
            },
            include: {
                participantA: {
                    select: {
                        id: true,
                        displayName: true,
                        imageURL: true
                    }
                },
                participantB: {
                    select: {
                        id: true,
                        displayName: true,
                        imageURL: true
                    }
                },
                messages: {
                    orderBy: {
                        sentAt: "asc"
                    }
                }
            }
        })

        if (!chatRes) {
            return res.status(404).send("No chat found")
        }

        if (chatRes.participantAId !== user.id && chatRes.participantBId !== user.id) {
            return res.status(403).send("You don't have access to this chat")
        }

        return res.send(chatRes)

    } catch (err) {
        return res.status(400).send(err)
    }

})


router.post('/', authenticateToken, async (req, res) => {
    const body = req.body

    const parseStatus = createRoomBodySchema.safeParse(body);
    if (!parseStatus.success) return res.status(400).send("Invalid Data");

    const parsedBody = parseStatus.data;

    try {   

        // Check if participant Id is valid or not
        if (parsedBody.participantAId.length != 24 || /[0-9A-Fa-f]{24}/g.test(parsedBody.participantAId) === false) {
            return res.status(404).send("Participant A not found");
        }

        if (parsedBody.participantBId.length != 24 || /[0-9A-Fa-f]{24}/g.test(parsedBody.participantBId) === false) {
            return res.status(404).send("Participant B not found");
        }

        if (parsedBody.participantAId === parsedBody.participantBId) {
            return res.status(400).send("You cannot make chat with both of participants are same user")
        }

        // If there is room already, send that room
        const findOldChatRoom = await db.chat.findFirst({
            where: {
                OR: [
                    {
                        participantAId: parsedBody.participantAId,
                        participantBId: parsedBody.participantBId
                    },
                    {
                        participantAId: parsedBody.participantBId,
                        participantBId: parsedBody.participantAId
                    }
                ]
            }
        })

        if (findOldChatRoom) {
            return res.send(findOldChatRoom)
        }

        const chatRes = await db.chat.create({
            data: {
                participantAId: parsedBody.participantAId,
                participantBId: parsedBody.participantBId
            }
        })

        io.emit(`users:${parsedBody.participantAId}:chatsUpdate`)
        io.emit(`users:${parsedBody.participantBId}:chatsUpdate`)

        return res.send(chatRes)

    } catch (err) {
        return res.status(400).send(err);
    }
})

router.put('/:id/read', authenticateToken, async (req, res) => {

})

export default router