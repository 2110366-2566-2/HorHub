import express, { Express, Request, Response } from "express";
import { Router } from "express";
import { db } from "../lib/db";
import { authenticateToken } from "../middlewares/authToken";
import { z } from "zod";
import bcrypt from "bcrypt";
import { supportBankName } from "../lib/constant";

import { DataSender, Schema_DataSender, sender } from "../lib/mail_sender";
import { authenticateProvider } from "../middlewares/authProvider";
import { authenticateCustomer } from "../middlewares/authCustomer";
import { refreshBookings } from "../lib/bookingRefresher";
import { User } from "@prisma/client";

const userChangePasswordSchema = z.object({
    oldPassword: z.string().trim().min(1, { message: "Please fill this field" }),
    newPassword: z
      .string()
      .trim()
      .min(8, { message: "Password must be at least 8 characters" }),
  });
  
  const createPaymentMethodSchema = z
    .object({
      type: z.enum(["Bank", "Card"], {
        invalid_type_error: "Method type is not valid",
      }),
      info: z.string().trim().min(1),
    })
    .refine(({ type, info }) => {
      const bankName = info.split("-")[0];
      const bankNumber = info.split("-")[1];
      if (type === "Bank") {
        if (!supportBankName.includes(bankName)) {
          return false;
        }
        if (!/[0-9]{10}/.test(bankNumber)) {
          return false;
        }
      } else if (type === "Card") {
        if (info.length !== 16) {
          return false;
        }
      }
      return true;
    });
//=========================================================

//@desc     Get a User 
//@route    GET /users/:id
//@access   Await P nick (Choice: Private , Public)
//@access   Public <= example 

exports.getUser = async (req: Request, res : Response) => {
    const { id } = req.params;
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
    });
  
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
  
    res.send(user);
  };

//@desc     Delete a User 
//@route    DELETE /users/:id
//@access   Await P nick (Choice: Private , Public)

exports.deleteUser = async (req : Request, res : Response) => {
    const { id } = req.params;
  
    const body = req.body;
  
    if (id != body.user.id) {
      return res.status(401).send("Unauthorized");
    }
  
    const isMatch = await bcrypt.compare(body.password, body.user.password);
  
    if (!isMatch) {
      return res.status(400).send("Password is wrong");
    }
  
    const deleteRes = await db.user.delete({
      where: {
        id: id,
      },
    });
  
    if (deleteRes) {
      return res.send("Success");
    } else {
      return res.status(400).send("Something went wrong");
    }
  };

//@desc     Update a User's Password 
//@route    PUT /users/:id/password
//@access   Await P nick (Choice: Private , Public)

exports.updatePassword = async (req : Request, res : Response) => {
    const { id } = req.params;
  
    const body = req.body;
  
    if (id != body.user.id) {
      return res.status(401).send("Unauthorized");
    }
  
    const isMatch = await bcrypt.compare(body.oldPassword, body.user.password);
  
    if (!isMatch) {
      return res.status(400).send("Old password is wrong");
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(body.newPassword, salt);
  
      const changeRes = await db.user.update({
        where: {
          id: id,
        },
        data: {
          password: hashedNewPassword,
        },
      });
  
      return res.send("Success");
    } catch (err) {
      return res.status(400).send(err);
    }
};

//@desc     Get a User's payment method
//@route    GET /users/:id/paymentMethods
//@access   Await P nick (Choice: Private , Public)

exports.getPaymentMethod = async (req : Request, res : Response) => {
    const { id } = req.params;
  
    const results = await db.paymentMethod.findMany({
      where: {
        userId: id,
      },
    });
  
    return res.send(results);
  };

//@desc     Create a new payment method
//@route    POST /users/:id/paymentMethods
//@access   Await P nick (Choice: Private , Public)

exports.createNewPaymentMethod = async (req : Request, res : Response) => {
    const { id } = req.params;
  
    const body = req.body;
  
    if (id != body.user.id) {
      return res.status(401).send("Unauthorized");
    }
  
    const parseStatus = createPaymentMethodSchema.safeParse(req.body);
    if (!parseStatus.success) console.log(parseStatus.error);
    if (!parseStatus.success) return res.status(403).send("Invalid Data");
  
    const data = parseStatus.data;
  
    const userQuery = await db.user.findUnique({
      where: {
        id: id,
      },
    });
  
    if (!userQuery) {
      return res.status(400).send("No user found");
    }
  
    const countMethod = await db.paymentMethod.count({
      where: {
        userId: id,
        type: data.type,
        info: data.info,
      },
    });
  
    console.log(countMethod);
  
    if (countMethod !== 0) {
      return res.status(400).send("Duplicate method");
    }
  
    const paymentResponse = await db.paymentMethod.create({
      data: {
        userId: id,
        type: data.type,
        info: data.info,
      },
    });
  
    return res.send(paymentResponse);
  }

//@desc     Update a payment method
//@route    PUT /users/:id/paymentMethods/:methodId
//@access   Await P nick (Choice: Private , Public)

exports.updatePaymentMethod = async (req : Request, res : Response) => {
    const { id, methodId } = req.params;

    const body = req.body;

    if (id != body.user.id) {
      return res.status(401).send("Unauthorized");
    }

    const parseStatus = createPaymentMethodSchema.safeParse(req.body);
    if (!parseStatus.success) return res.status(403).send("Invalid Data");

    const data = parseStatus.data;

    const userQuery = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!userQuery) {
      return res.status(400).send("No user found");
    }

    const countMethod = await db.paymentMethod.count({
      where: {
        id: methodId,
      },
    });

    if (countMethod === 0) {
      return res.status(400).send("No payment method found");
    }

    const methodResponse = await db.paymentMethod.update({
      where: {
        id: methodId,
      },
      data: {
        type: data.type,
        info: data.info,
      },
    });

    return res.send(methodResponse);
};

//@desc     Delete a payment method
//@route    DELETE /users/:id/paymentMethods/:methodId
//@access   Await P nick (Choice: Private , Public)

exports.deletePaymentMethod = async (req : Request, res : Response) => {
    const { id, methodId } = req.params;
    const body = req.body;

    if (id != body.user.id) {
      return res.status(401).send("Unauthorized");
    }
    const userQuery = await db.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!userQuery) {
      return res.status(400).send("No user found");
    }

    const countMethod = await db.paymentMethod.count({
      where: {
        id: methodId,
      },
    });

    if (countMethod === 0) {
      return res.status(400).send("No payment method found");
    }

    const deleteRes = await db.paymentMethod.delete({
      where: {
        id: methodId,
      },
    });

    return res.send(deleteRes);
};

//@desc     Get list of Dorm provided by User
//@route    GET /users/:id
//@access   Await P nick (Choice: Private , Public)

exports.getProvidedDorm = async (req : Request, res : Response) => {
    const { id } = req.params;

    if (id.length != 24 || /[0-9A-Fa-f]{24}/g.test(id) === false) {
      return res.status(404).send("No user found");
    }

    const findDormsRes = await db.dorm.findMany({
      where: {
        providerId: id,
      },
      include: {
        roomTypes: true,
      },
    });

    return res.send(findDormsRes);
  };

//@desc     Get Booking when paying (why ?)
//@route    GET /users/:bookingId/payment/bookings/
//@access   Await P nick (Choice: Private , Public)

exports.getInfoBeforePaying = async (req : Request, res : Response) => {
    const user: User = req.body.user;
    delete req.body.user;
    const { bookingId } = req.params;
    try {
      const result = await db.booking.findFirst({
        where: {
          AND: [
            { id: bookingId },
            { status: "PaymentPending" },
          ],
        },
        include: {
          roomType: {
            select: {
              capacity: true,
              name: true,
              numberOfAvailableRoom: true,
              numberOfRoom: true,
              images: true,
              dorm: { select: { name: true } },
            },
          },
        },
      });
      if (!result) {
        return res.status(404).send("Not found");
      }
      if (user.id !== result.customerId) {
        return res.status(403).send("Not allow");
      }
      return res.send(result);
    } catch (err) {
      console.log(err);
      return res.status(403);
    }
};

//@desc     Get All Bookings
//@route    GET /users/:id/bookings
//@access   Await P nick (Choice: Private , Public)

exports.getBookings = async (req : Request, res : Response) => {
    const { id } = req.params;

    if (id.length != 24 || /[0-9A-Fa-f]{24}/g.test(id) === false) {
      return res.status(404).send("No user found");
    }

    if (id !== req.body.user.id) {
      return res.status(403).send("You don't have access to view this");
    }

  try {
    // Update outdated status
    await refreshBookings()

      const findRes = await db.booking.findMany({
        where: {
          customerId: id,
        },
        include: {
          roomType: {
            include: {
              dorm: true,
            },
          },
        },
        orderBy: {
          bookAt: "desc",
        },
      });

      return res.send(findRes);
    } catch (err) {
      return res.status(400).send(err);
    }
  };

//@desc     Get All Chats
//@route    GET /users/:id/chats
//@access   Await P nick (Choice: Private , Public)

exports.getChats = async (req : Request, res : Response) => {
    const { id } = req.params;
  
    if (id.length != 24 || /[0-9A-Fa-f]{24}/g.test(id) === false) {
      return res.status(404).send("No user found");
    }
  
    try {
      const chatsRes = await db.chat.findMany({
        where: {
          OR: [
            {
              participantAId: id,
            },
            {
              participantBId: id,
            },
          ],
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
              sentAt: "desc",
            },
            take: 1,
          },
        },
        orderBy: {
          lastUpdated: "desc",
        },
      });
  
      const result = chatsRes.map((chat) => {
        if (chat.messages.length === 0) {
          const result: any = { ...chat };
          delete result.messages;
          return result;
        } else {
          const result: any = { ...chat, latestMessage: chat.messages[0] };
          delete result.messages;
          return result;
        }
      });
  
      return res.send(result);
  
      // return res.send(chatsRes)
    } catch (err) {
      return res.status(400).send(err);
    }
  };

  const sendMail = async (
    fromWho: string,
    toWho: string,
    subject: string,
    massage: string
  ) => {
    const mailToSend = {
      from: fromWho,
      to: toWho,
      subject: subject,
      html: massage,
    };
    const data_parse = Schema_DataSender.safeParse(mailToSend);
    if (!data_parse.success) {
      return null;
    }
    const mail: DataSender = data_parse.data;
    const result = await sender(mail);
    return result;
  };

//@desc     Change email to confirm that user'email has been changed
//@route    PUT /users/:id/email
//@access   Await P nick (Choice: Private , Public)

exports.sendChangingEmailConfirmation = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const body = req.body;
  
    if (id != body.user.id) {
      return res.status(401).send("Unauthorized");
    }
    try {
      // New email is in a parameter call "newEmail"
      const newmail = body.newEmail;
  
      const oldmail = body.user.email;
  
      // TODO check if it is the same email as the old one
      if (newmail === oldmail) {
        return res
          .status(400)
          .send("The new email cannot be the same as the old one.");
      }
      // TODO check if the mail's already exist in DB
      const userEmailCount = await db.user.count({
        where: {
          email: newmail,
        },
      });
  
      if (userEmailCount > 0) {
        return res.status(400).send("The new email has already been used.");
      }
  
      // TO DO change Email
      const changeEmail = await db.user.update({
        where: {
          id: id,
        },
        data: {
          email: newmail,
        },
      });
  
      // TO DO send email to old email
      
      const subjectOldMail: string = "Horhub Account's Email Changes";
      const messageOldMail: string = `<h1>Hello, ${body.user.displayName}!</h1><span>The email for logging in this account has been changed to ${newmail}. If you does not proceed this, please contract admin immediately.</span>`;
  
      const resultOldMail = await sendMail(
        process.env.HOST_USER as string,
        oldmail,
        subjectOldMail,
        messageOldMail
      );
  
      // TO DO send email to new email
      const subjectNewMail: string = "Horhub Account's Email Changes";
      const messageNewMail: string = `<h1>Hello, ${body.user.displayName}!</h1>
                                      <span>This email will be used for logging in ${body.user.displayName}'s account. If you does not proceed this, please contract admin immediately.</span>`;
  
      const resultNewMail = await sendMail(
        process.env.HOST_USER as string,
        newmail,
        subjectNewMail,
        messageNewMail
      );
  
      return res.send("Success");
    } catch (err) {
      return res.status(400).send(err);
    }
};