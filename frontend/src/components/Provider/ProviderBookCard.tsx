import React, { useState } from "react";
import { BookingProviderType, BookingType } from "../../lib/type/Booking";
import { FaRegClock } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { Bounce, toast } from "react-toastify";
import BookingStatusBadge from "../Booking/BookingStatusBadge";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProviderBookCard = ({ data }: { data: BookingProviderType }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  async function cancelReservation() {
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/bookings/" + data.id,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Cancelled" }),
        }
      );

      if (res.ok) {
        handleClose();
        navigate(0);
      } else {
      }
    } catch (err) {
      console.log(err);
      return;
    }
  }
  return (
    <div className="card w-full md:w-3/4 bg-base-200 shadow-lg border border-slate-300">
      <div className="card-body py-4 flex flex-row">
        <div className="w-[80%] flex flex-col gap-2">
          <p className="card-title text-sm w-fit">
            {data.customer.displayName}
          </p>

          <p className="text-xs">
            Full name : {data.customer.firstName} {data.customer.lastName} ,
            Gender :{data.customer.gender}, PhoneNumber :
            {data.customer.phoneNumber}
          </p>
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
                <button onClick={handleOpen} className="danger-button">
                  Cancel booking
                </button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <div className="flex flex-col gap-y-6">
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Do you really want to cancel this booking?
                      </Typography>
                      <div className="flex ">
                        <button
                          className="danger-button w-full"
                          onClick={cancelReservation}
                        >
                          Yes
                        </button>
                        <button
                          className="primary-button w-full"
                          onClick={handleClose}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </Box>
                </Modal>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderBookCard;
