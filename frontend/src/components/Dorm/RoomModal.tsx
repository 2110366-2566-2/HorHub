import { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdEventAvailable, MdNotes } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { SlSizeFullscreen } from "react-icons/sl";
import { availableRoomFacilities } from "../../lib/constants/roomFacilities";
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
  isPreview: boolean;
};
export default function RoomModal({
  name,
  cost,
  description,
  size,
  capacity,
  roomFacilities,
  numberOfAvailableRoom,
  numberOfRoom,
  images,
  isPreview,
}: Room) {
  const [idxImg, setIdxImg] = useState<number>(0);
  return (
    <div className="flex max-h-screen overflow-scroll overflow-x-hidden overflow-y-auto px-2">
      <div className="w-1/2 pr-6">
        {/* <h2 className="font-bold text-xl">Room Image</h2> */}
        <figure className="w-full">
          <img
            className="w-full aspect-square object-cover"
            src={images[idxImg]}
          ></img>
        </figure>
        <div className="flex gap-2 flex-wrap ">
          {images.map((url, idx) => {
            return (
              <img
                src={url}
                width={60}
                height={60}
                className={idx === idxImg ? "border-orange-400 border-2" : ""}
                onClick={() => {
                  setIdxImg(idx);
                }}
              ></img>
            );
          })}
        </div>
      </div>
      <div className="w-1/2 gap-4 flex flex-col">
        <h2 className="font-bold text-xl">{name}</h2>

        <div className="card-actions justify-start flex flex-col">
          <span className="font-bold">Room Facilities</span>
          <div className="flex flex-wrap gap-2">
            {availableRoomFacilities
              .filter((fac) => roomFacilities.includes(fac.value as any))
              .map((fac, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-60 border border-slate-300 px-3 py-2 rounded-md flex gap-2 hover:bg-indigo-50 transition-colors"
                  >
                    {fac.label}
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MdNotes />
          <span className="font-bold">Description</span> : {description}
        </div>
        <div className="flex items-center gap-2">
          <SlSizeFullscreen />
          <span className="font-bold">Size</span> : {size} square meter
        </div>
        <div className="flex items-center gap-2">
          <RiMoneyDollarCircleLine />
          <span className="font-bold">Cost</span> : {cost} baht/month
        </div>
        <div className="flex items-center gap-2">
          <IoPersonAddSharp />
          <span className="font-bold">Capacity</span> : {capacity} people
        </div>
        {/* <div className="flex items-center gap-2">
          <MdEventAvailable />
          <span className="font-bold">Room Availability</span> :{" "}
          {numberOfAvailableRoom} / {numberOfRoom}
        </div> */}

        <div className="card-actions justify-end">
          {
            <button className={"primary-button " + (isPreview ? "hidden" : "")}>
              Reserve Room!
            </button>
          }
        </div>
      </div>
    </div>
  );
}
