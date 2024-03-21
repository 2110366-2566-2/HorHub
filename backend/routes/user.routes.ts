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

const router = Router();

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

router.get("/:id", async (req, res) => {
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
});

router.delete("/:id", authenticateToken, async (req, res) => {
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
});

router.put("/:id/password", authenticateToken, async (req, res) => {
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
});

router.get("/:id/paymentMethods", async (req, res) => {
  const { id } = req.params;

  const results = await db.paymentMethod.findMany({
    where: {
      userId: id,
    },
  });

  return res.send(results);
});

router.post("/:id/paymentMethods", authenticateToken, async (req, res) => {
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
});

router.put(
  "/:id/paymentMethods/:methodId",
  authenticateToken,
  async (req, res) => {
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
  }
);

router.delete(
  "/:id/paymentMethods/:methodId",
  authenticateToken,
  async (req, res) => {
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
  }
);

router.get("/:id/dorms", authenticateToken, authenticateProvider, async (req, res) => {
    const { id } = req.params

    if (id.length != 24 || /[0-9A-Fa-f]{24}/g.test(id) === false) {
        return res.status(404).send("No user found")
    }

    const findDormsRes = await db.dorm.findMany({
        where: {
            providerId: id
        },
        include: {
            roomTypes: true
        }
    })

    return res.send(findDormsRes)
})


router.get("/:id/bookings", authenticateToken, authenticateCustomer, async (req, res) => {
  const { id } = req.params

  if (id.length != 24 || /[0-9A-Fa-f]{24}/g.test(id) === false) {
      return res.status(404).send("No user found")
  }

  if (id !== req.body.user.id) {
    return res.status(403).send("You don't have access to view this")
  }

  try {
    // Update outdated status
    const updateRes = await db.booking.updateMany({
      where: {
        status: "Pending",
        startAt: {
          lte: new Date()
        }
      },
      data: {
        status: "Cancelled"
      }
    })

    const findRes = await db.booking.findMany({
      where: {
        customerId: id
      },
      include: {
        roomType: {
          include: {
            dorm: true
          }
        }
      },
      orderBy: {
        bookAt: "desc"
      }
    })

    return res.send(findRes)
  }
  catch (err) {
    return res.status(400).send(err)
  }
})

router.get("/:id/chats", authenticateToken, async (req, res) => {
  const { id } = req.params

  if (id.length != 24 || /[0-9A-Fa-f]{24}/g.test(id) === false) {
      return res.status(404).send("No user found")
  }

  try {
    const chatsRes = await db.chat.findMany({
      where: {
        OR: [
          {
            participantAId: id,
          },
          {
            participantBId: id
          }
        ]
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
        }
      },
      orderBy: {
        lastUpdated: "desc"
      }
    })

    return res.send(chatsRes)



  } catch (err) {
    return res.status(400).send(err)
  }

})

// ===================================== NINE will try his best
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
router.put("/:id/email", async (req: Request, res: Response) => {
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

    //  "from" : process.env.HOST_USER,
    //const fromSys = process.env.HOST_USER
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
});

export default router;
