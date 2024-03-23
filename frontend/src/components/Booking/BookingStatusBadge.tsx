import React from 'react'

const BookingStatusBadge = ({ status }: { status: string }) => {
    if (status === "Pending") {
        return (
            <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Pending
            </div>
        )
    }
    else if (status === "Cancelled") {
        return (
            <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Cancelled
            </div>
        )
    }
    else if (status === "PaymentPending") {
        return (
            <div className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Payment Pending
            </div>
        )
    }
    else if (status === "Confirmed") {
        return (
            <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Confirmed
            </div>
        )
    }
    else if (status === "Completed") {
        return (
            <div className="bg-sky-100 text-sky-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Completed
            </div>
        )
    }


    return (
        <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Cancelled
        </div>
    )
  
}

export default BookingStatusBadge