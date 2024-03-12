import React from 'react'
import { BookingType } from '../../lib/type/Booking'
import { FaRegClock } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import BookingStatusBadge from './BookingStatusBadge';

const BookingCard = ({ data }: { data: BookingType }) => {
  return (
    <div className="card w-full md:w-3/4 bg-base-200 shadow-lg border border-slate-300">
        <div className="card-body py-4 flex flex-row">
            <div className="w-[80%] flex flex-col gap-2">
                <a className="card-title text-sm w-fit" href={"dorms/" + data.roomType.dormId}>{data.roomType.dorm.name}</a>
                
                <p className="text-xs">{data.roomType.name}</p>
                <div className="flex gap-3 items-center text-xs">
                    <FaRegClock />
                    <div>Duration: {new Date(data.startAt.toString()).toDateString()} - {new Date(data.endAt.toString()).toDateString()}</div>
                </div>
                <div className="flex gap-3 items-center text-xs">
                    <FiBookOpen />
                    <div>You booked at {new Date(data.bookAt.toString()).toDateString()}</div>
                </div>
            </div>
            <div className="w-[20%] flex flex-col gap-2 text-xs items-end">
                <BookingStatusBadge status={data.status} />
                <div className="grow text-sm flex items-center font-bold">฿{Number(data.price).toFixed(2)}</div>
            </div>
            
        </div>
    </div>
  )
}

export default BookingCard