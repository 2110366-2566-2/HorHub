import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { SlSizeFullscreen } from "react-icons/sl";
import { MdEventAvailable } from "react-icons/md";
import RoomModal from "./RoomModal";

type Room = {
  roomId: string;
  name: string;
  cost: number;
  size: number;
  capacity: number;
  description: string;
  roomFacilities: string[];
  numberOfAvailableRoom: number;
  numberOfRoom: number;
  images: string[];
  isEdit: boolean;
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
  dormId,
  roomId,
  name,
  cost,
  description,
  size,
  capacity,
  roomFacilities,
  numberOfAvailableRoom,
  numberOfRoom,
  images,
  isEdit,
}: Room & {dormId: string}) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  async function deleteRoom() {
    try {
      const result = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/dorms/" + dormId + "/roomtypes/" + roomId,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (result.ok) {
        window.location.reload();
      }
    }
    catch (err) {
      return
    }
  }

  return (
    <>
      <div className="card bg-indigo-100 w-96 shadow-xl ">
        <div className="card-body">
          <div className="card-title">{name}</div>
          <div className="flex items-center gap-4">
            <IoPersonAddSharp />
            <div>Capacity : {capacity} people</div>
          </div>
          <div className="flex items-center gap-4">
            <RiMoneyDollarCircleLine />
            <div>Cost : ฿{Number(cost).toFixed(2)}/month</div>
          </div>
          <div className="flex items-center gap-4">
            <SlSizeFullscreen />
            <div>Size : {size} square meter</div>
          </div>
          {/* <div className="flex items-center gap-4">
            <MdEventAvailable />
            <div>
              Availability : {numberOfAvailableRoom} / {numberOfRoom}
            </div>
          </div> */}
          {/* <div className="card-actions justify-end">
            {roomFacilities.map((roomFal) => {
              return <div className="badge badge-outline">{roomFal}</div>;
            })}
          </div> */}

          <div className="card-actions justify-end">
            {
              (isEdit) && <>
              <button className="danger-button" onClick={handleOpenDelete}>
                Delete
              </button>
              <Modal
                  open={openDelete}
                  onClose={handleCloseDelete}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style} className="modal-box">
                    <div className="flex flex-col gap-y-6">
                      {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                        Do you really want to delete this dorm?
                      </Typography> */}
                      <div className="font-bold text-lg text-center">
                        Deleting Room
                      </div>

                      <div className="text-sm">
                        Are you sure to delete this room?
                      </div>
                      <div className="flex gap-5">
                        <button
                          className="bordered-button w-full"
                          onClick={handleCloseDelete}
                        >
                          No
                        </button>
                        <button className="danger-button w-full" onClick={deleteRoom}>
                          Yes
                        </button>
                      </div>
                    </div>
                  </Box>
                </Modal>
              </>

            }
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
            roomId={roomId}
            name={name}
            cost={cost}
            capacity={capacity}
            size={size}
            roomFacilities={roomFacilities}
            description={description}
            numberOfAvailableRoom={numberOfAvailableRoom}
            numberOfRoom={numberOfRoom}
            images={images}
            isEdit={isEdit}
          />
        </Box>
      </Modal>
    </>
  );
}
