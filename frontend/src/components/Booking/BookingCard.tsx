import React, { useState } from "react";
import { BookingType } from "../../lib/type/Booking";
import { FaRegClock } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import BookingStatusBadge from "./BookingStatusBadge";
import { Bounce, toast } from "react-toastify";
import { Link } from "react-router-dom";

const BookingCard = ({ data }: { data: BookingType }) => {
  const [allowSubmit, setAllowSubmit] = useState<boolean>(true);
  console.log(data.endAt);
  async function cancelReservation() {
    setAllowSubmit(false);
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/bookings/" + data.id,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (res.ok) {
        window.location.reload();
      } else {
        setAllowSubmit(true);
      }
    } catch (err) {
      setAllowSubmit(true);
      return;
    }
  }

  return (
    <div className="card w-full md:w-3/4 bg-base-200 shadow-lg border border-slate-300">
      <div className="card-body py-4 flex flex-row">
        <div className="w-[80%] flex flex-col gap-2">
          <a
            className="card-title text-sm w-fit"
            href={"dorms/" + data.roomType.dormId}
          >
            {data.roomType.dorm.name}
          </a>

          <p className="text-xs">{data.roomType.name}</p>
          <div className="flex gap-3 items-center text-xs">
            <FaRegClock />
            <div>
              Duration: {new Date(data.startAt.toString()).toDateString()} -{" "}
              {new Date(data.endAt.toString()).toDateString()}
            </div>
          </div>
          <div className="flex gap-3 items-center text-xs">
            <FiBookOpen />
            <div>
              You booked at {new Date(data.bookAt.toString()).toDateString()}
            </div>
          </div>
        </div>
        <div className="w-[20%] flex flex-col gap-2 text-xs items-end">
          <BookingStatusBadge status={data.status} />
          <div className="grow text-sm flex items-center font-bold">
            ฿{Number(data.price).toFixed(2)}
          </div>
          <div className="flex items-center">
            {data.status === "Pending" && (
              <div className="w-full flex justify-start">
                <button
                  type="submit"
                  className="danger-button-xs"
                  onClick={() => {
                    if (document) {
                      (
                        document.getElementById(
                          "delete_booking_" + data.id
                        ) as HTMLFormElement
                      ).showModal();
                    }
                  }}
                >
                  Cancel
                </button>
                <Link 
                  to={`/bookings/${data.id}/payment`}
                  className="primary-button"
                >
                  Pay
                </Link>
                <dialog id={"delete_booking_" + data.id} className="modal">
                  <div className="modal-box bg-white gap-3 space-y-3">
                    <div className="font-bold text-lg text-center">
                      Cancelling Reservation
                    </div>
                    <div className="text-sm">
                      Are you sure to cancel this reservation?
                    </div>
                    <div className="w-full flex justify-center gap-2">
                      <form method="dialog">
                        <button className="bordered-button">No</button>
                      </form>
                      {allowSubmit ? (
                        <button
                          className="danger-button"
                          onClick={cancelReservation}
                        >
                          Yes
                        </button>
                      ) : (
                        <button className="disabled-button" disabled>
                          Yes
                        </button>
                      )}
                    </div>
                  </div>

                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
