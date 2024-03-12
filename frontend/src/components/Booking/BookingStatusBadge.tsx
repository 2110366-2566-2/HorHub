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


    return (
        <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Cancelled
        </div>
    )
  
}

export default BookingStatusBadge