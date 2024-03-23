import { db } from "./db";

export async function refreshBookings() {
    const updateCancelRes = await db.booking.updateMany({
        where: {
          status: {
            in: ["Pending", "PaymentPending"]
          },
          startAt: {
            lte: new Date()
          }
        },
        data: {
          status: "Cancelled"
        }
    })

    const updateCompleteRes = await db.booking.updateMany({
        where: {
            status: "Confirmed",
            endAt: {
                lte: new Date()
            }
        },
        data: {
            status: "Completed"
        }
    })
}