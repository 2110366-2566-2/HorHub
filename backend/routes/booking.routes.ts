import { Router } from "express";
import { authenticateToken } from "../middlewares/authToken";
import { authenticateCustomer } from "../middlewares/authCustomer";
import { User } from "@prisma/client";
import { z } from "zod";
import { db } from "../lib/db";
import { authenticateProvider } from "../middlewares/authProvider";
import { bookStatus } from "../lib/constant";
import { refreshBookings } from "../lib/bookingRefresher";

const router = Router();

const bookingSchema = z
  .object({
    roomTypeId: z.string(),
    startAt: z.coerce.date().refine((data) => data > new Date(), {
      message: "This should not be before tomorrow",
    }),
    endAt: z.coerce.date(),
    price: z.coerce
      .number()
      .min(0.01, { message: "Please fill valid price of this booking" })
      .multipleOf(0.01, { message: "Please fill valid price of this booking" }),
  })
  .refine((data) => data.startAt <= data.endAt, {
    path: ["endAt"],
    message: "This should be after or at starting date",
  });

const bookUpdateSchema = z.object({
  status: z.enum(["Cancelled", "PaymentPending", "Confirmed"]),
});



router.get("/:bookingId", authenticateToken, async (req, res) => {
  const { bookingId } = req.params;
  const user: User = req.body.user
  
  try {
    if (bookingId.length != 24 || /[0-9A-Fa-f]{24}/g.test(bookingId) === false) {
      return res.status(404).send("No booking found");
    }

    // Update outdated bookings
    await refreshBookings()

    const bookingRes = await db.booking.findUnique({
      include: {
        roomType: {
          include: {
            dorm: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
      where: {
        id: bookingId,
        OR: [
          {
            customerId: user.id
          },
          {
            roomType: {
              dorm: {
                providerId: user.id
              }
            }
          }
        ]
      }
    })

    if (!bookingRes) {
      return res.status(403).send("You cannot view this booking")
    }

    return res.send(bookingRes)

  } catch (err) {
    return res.status(400).send(err)
  }
})

router.post("/", authenticateToken, authenticateCustomer, async (req, res) => {
  const user: User = req.body.user;
  delete req.body.user;
  const body = req.body;

  const parseStatus = bookingSchema.safeParse(body);
  if (!parseStatus.success) console.log(parseStatus.error.issues);
  if (!parseStatus.success) return res.status(400).send("Invalid Data");

  const parsedBody = parseStatus.data;

  try {
    // Check if this room is available
    if (
      parsedBody.roomTypeId.length != 24 ||
      /[0-9A-Fa-f]{24}/g.test(parsedBody.roomTypeId) === false
    ) {
      return res.status(404).send("No room found");
    }
    const findRoomRes = await db.roomType.findUnique({
      where: {
        id: parsedBody.roomTypeId,
      },
    });

    if (!findRoomRes) {
      return res.status(404).send("No room found");
    }

    // Create booking

    const bookingRes = await db.booking.create({
      data: {
        ...parsedBody,
        customerId: user.id,
      },
    });

    return res.send(bookingRes);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

router.put("/:bookingId",
  authenticateToken,
  authenticateProvider,
  async (req, res) => {
    const { bookingId } = req.params;
    console.log("body");
    console.log(req.body);
    const { user, ...param } = req.body;

    const providerId = await db.booking.findUnique({
      where: { id: bookingId },
      select: {
        roomType: {
          select: { dorm: { select: { provider: { select: { id: true } } } } },
        },
      },
    });

    if (!providerId) {
      return res.status(404).send("Not found");
    }
    if (providerId.roomType.dorm.provider.id !== user.id) {
      return res.status(401).send("Not allow");
    }

    const data = bookUpdateSchema.safeParse(param);
    if (!data.success) {
      console.log(data.error);
      return res.status(403).send("Wrong format");
    }
    try {
      const result = await db.booking.update({
        where: { id: bookingId, status: "Pending" },
        data: { status: data.data.status },
      });
      return res.status(200).send(result);
    } catch (err) {
      //console.log(err);1
      return res.status(403).send("Change is not allow");
    }
  }
);

router.delete("/:bookingId", authenticateToken, async (req, res) => {
  const { bookingId } = req.params;

  const user: User = req.body.user;
  delete req.body.user;

  try {
    // Check if this booking is available
    if (
      bookingId.length != 24 ||
      /[0-9A-Fa-f]{24}/g.test(bookingId) === false
    ) {
      return res.status(404).send("No booking found");
    }

    const findBookingRes = await db.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        roomType: {
          include: {
            dorm: true,
          },
        },
      },
    });

    if (!findBookingRes) {
      return res.status(404).send("No booking found");
    }

    // Check if user have authority to manage
    if (
      !(
        findBookingRes.customerId === user.id ||
        findBookingRes.roomType.dorm.providerId === user.id
      )
    ) {
      return res
        .status(403)
        .send("You don't have access to manage this booking");
    }

    const deleteRes = await db.booking.delete({
      where: {
        id: bookingId,
      },
    });

    return res.send("Success");
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.post("/:bookingId/confirmpayment/:checkoutToken", async (req, res) => {
  const { bookingId, checkoutToken } = req.params;

  try {

    if (bookingId.length != 24 || /[0-9A-Fa-f]{24}/g.test(bookingId) === false) {
      return res.status(404).send("No booking found");
    }

    const bookingRes = await db.booking.findUnique({
      where: {
        id: bookingId,
        checkoutToken: checkoutToken,
        status: "PaymentPending"
      },
      include: {
        roomType: {
          include: {
            dorm: {
              include: {
                provider: {
                  select: {
                    id: true,
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!bookingRes) {
      return res.status(404).send("No booking found");
    }

    const customerTransaction = await db.transaction.create({
      data: {
        userId: bookingRes.customerId,
        type: "BookingPayment",
        price: bookingRes.price,
        description: "Make a payment to " + bookingRes.roomType.name + " - " + bookingRes.roomType.dorm.name
      }
    })

    const providerTransaction = await db.transaction.create({
      data: {
        userId: bookingRes.roomType.dorm.providerId,
        type: "WalletDeposit",
        price: Number((bookingRes.price * 0.95).toFixed(2)),
        description: "Reservation in " + bookingRes.roomType.name + " - " + bookingRes.roomType.dorm.name
      }
    })

    const updateBookingRes = await db.booking.update({
      where: {
        id: bookingId
      },
      data: {
        status: "Confirmed",
        transactionId: customerTransaction.id
      }
    })

    const updateProviderBalance = await db.user.update({
      where: {
        id: bookingRes.roomType.dorm.providerId
      },
      data: {
        balance: {
          increment: Number((bookingRes.price * 0.95).toFixed(2))
        }
      }
    })

    return res.send(customerTransaction)

  } catch (err) {
    return res.status(400).send(err)
  }
})

export default router;
