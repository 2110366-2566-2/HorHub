import { Request, Response, Router } from "express";
import { z } from "zod";
import { db } from "../lib/db";
import { authenticateToken } from "../middlewares/authToken";
import { io } from "..";


const createRoomBodySchema = z.object({
    participantAId: z.string(),
    participantBId: z.string(),
  });

//===============================================================

//@desc     Get a chat
//@route    GET chats/:id
//@access   Await P nick (Choice: Private , Public)
//@access   Public <= example 

exports.getChat = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const user = req.body.user;
  
    if (id.length != 24 || /[0-9A-Fa-f]{24}/g.test(id) === false) {
      return res.status(404).send("No chat found");
    }
  
    try {
      // Check if chat is valid
      const chatRes = await db.chat.findUnique({
        where: {
          id: id,
        },
        include: {
          participantA: {
            select: {
              id: true,
              displayName: true,
              imageURL: true,
            },
          },
          participantB: {
            select: {
              id: true,
              displayName: true,
              imageURL: true,
            },
          },
          messages: {
            orderBy: {
              sentAt: "asc",
            },
          },
        },
      });
  
      if (!chatRes) {
        return res.status(404).send("No chat found");
      }
  
      if (
        chatRes.participantAId !== user.id &&
        chatRes.participantBId !== user.id
      ) {
        return res.status(403).send("You don't have access to this chat");
      }
  
      return res.send(chatRes);
    } catch (err) {
      return res.status(400).send(err);
    }
  };

//@desc     Create a chat
//@route    GET chats/
//@access   Await P nick (Choice: Private , Public)

exports.createChat = async (req: Request, res: Response) => {
    const body = req.body;
  
    const parseStatus = createRoomBodySchema.safeParse(body);
    if (!parseStatus.success) return res.status(400).send("Invalid Data");
  
    const parsedBody = parseStatus.data;
  
    try {
      // Check if participant Id is valid or not
      if (
        parsedBody.participantAId.length != 24 ||
        /[0-9A-Fa-f]{24}/g.test(parsedBody.participantAId) === false
      ) {
        return res.status(404).send("Participant A not found");
      }
  
      if (
        parsedBody.participantBId.length != 24 ||
        /[0-9A-Fa-f]{24}/g.test(parsedBody.participantBId) === false
      ) {
        return res.status(404).send("Participant B not found");
      }
  
      if (parsedBody.participantAId === parsedBody.participantBId) {
        return res
          .status(400)
          .send("You cannot make chat with both of participants are same user");
      }
  
      // If there is room already, send that room
      const findOldChatRoom = await db.chat.findFirst({
        where: {
          OR: [
            {
              participantAId: parsedBody.participantAId,
              participantBId: parsedBody.participantBId,
            },
            {
              participantAId: parsedBody.participantBId,
              participantBId: parsedBody.participantAId,
            },
          ],
        },
      });
  
      if (findOldChatRoom) {
        return res.send(findOldChatRoom);
      }
  
      const chatRes = await db.chat.create({
        data: {
          participantAId: parsedBody.participantAId,
          participantBId: parsedBody.participantBId,
        },
      });
  
      io.emit(`users:${parsedBody.participantAId}:chatsUpdate`);
      io.emit(`users:${parsedBody.participantBId}:chatsUpdate`);
  
      return res.send(chatRes);
    } catch (err) {
      return res.status(400).send(err);
    }
};

//@desc     Update a chat
//@route    PUT chats/:id/read
//@access   Await P nick (Choice: Private , Public)

exports.updateChat = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const user = req.body.user;
    const userId: string = user.id;
  
    try {
      // Check if chat id is valid
      if (id.length != 24 || /[0-9A-Fa-f]{24}/g.test(id) === false) {
        return res.status(404).send("Chat not found");
      }
  
      // Check if user have priority to read
      const roomRes = await db.chat.findUnique({
        where: {
          id: id,
          OR: [
            {
              participantAId: userId,
            },
            {
              participantBId: userId,
            },
          ],
        },
      });
  
      if (!roomRes) {
        return res
          .status(403)
          .send("You don't have priority to update this chat");
      }
  
      if (roomRes.participantAId === userId) {
        // Update A
        const updateRes = await db.chat.update({
          where: {
            id: id,
          },
          data: {
            participantAUnread: 0,
          },
        });
  
        io.emit(`users:${userId}:chatsUpdate`);
  
        return res.send(updateRes);
      } else {
        // Update B
        const updateRes = await db.chat.update({
          where: {
            id: id,
          },
          data: {
            participantBUnread: 0,
          },
        });
  
        io.emit(`users:${userId}:chatsUpdate`);
  
        return res.send(updateRes);
      }
    } catch (err) {
      return res.status(403).send(err);
    }
  };