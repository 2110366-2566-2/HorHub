import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { SlSizeFullscreen } from "react-icons/sl";
import { MdEventAvailable } from "react-icons/md";
import RoomModal from "./RoomModal";

type Room = {
  name: string;
  cost: number;
  size: number;
  capacity: number;
  description: string;
  roomFacilities: string[];
  numberOfAvailableRoom: number;
  numberOfRoom: number;
  images: string[];
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function RoomCard({
  name,
  cost,
  description,
  size,
  capacity,
  roomFacilities,
  numberOfAvailableRoom,
  numberOfRoom,
  images,
}: Room) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className="card bg-sky-300 w-96 shadow-xl ">
        <div className="card-body">
          <div className="card-title">{name}</div>
          <div className="flex items-center gap-4">
            <IoPersonAddSharp />
            <div>Capacity : {capacity}</div>
          </div>
          <div className="flex items-center gap-4">
            <RiMoneyDollarCircleLine />
            <div>Cost : {cost}</div>
          </div>
          <div className="flex items-center gap-4">
            <SlSizeFullscreen />
            <div>Size : {size}</div>
          </div>
          <div className="flex items-center gap-4">
            <MdEventAvailable />
            <div>
              Availability : {numberOfAvailableRoom} / {numberOfRoom}
            </div>
          </div>
          <div className="card-actions justify-end">
            {roomFacilities.map((roomFal) => {
              return <div className="badge badge-outline">{roomFal}</div>;
            })}
          </div>
          <div className="card-actions justify-end">
            <button className=" primary-button " onClick={handleOpen}>
              View Detail
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <RoomModal
            name={name}
            cost={cost}
            capacity={capacity}
            size={size}
            roomFacilities={roomFacilities}
            description={description}
            numberOfAvailableRoom={numberOfAvailableRoom}
            numberOfRoom={numberOfRoom}
            images={images}
          />
        </Box>
      </Modal>
    </>
  );
}
