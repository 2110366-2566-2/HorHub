import { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdEventAvailable, MdNotes } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { SlSizeFullscreen } from "react-icons/sl";
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
}: Room) {
  const [idxImg, setIdxImg] = useState<number>(0);
  return (
    <div className="flex max-h-screen overflow-scroll overflow-x-hidden px-2">
      <div className="w-1/2">
        <h2 className="font-bold text-xl">Room Image</h2>
        <figure className="w-full">
          <img className="w-full" src={images[idxImg]}></img>
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

        <div className="card-actions justify-start items-center">
          <span className="font-bold">Room Facilities : </span>
          {roomFacilities.map((roomFal) => {
            return <div className="badge badge-outline">{roomFal}</div>;
          })}
        </div>
        <div className="flex items-center gap-2">
          <MdNotes />
          <span className="font-bold">Description</span> : {description}
        </div>
        <div className="flex items-center gap-2">
          <SlSizeFullscreen />
          <span className="font-bold">Size</span> : {size}
        </div>
        <div className="flex items-center gap-2">
          <RiMoneyDollarCircleLine />
          <span className="font-bold">Cost</span> : {cost}
        </div>
        <div className="flex items-center gap-2">
          <IoPersonAddSharp />
          <span className="font-bold">Capacity</span> : {capacity}
        </div>
        <div className="flex items-center gap-2">
          <MdEventAvailable />
          <span className="font-bold">Room Availability</span> :{" "}
          {numberOfAvailableRoom} / {numberOfRoom}
        </div>

        <div className="card-actions justify-end">
          <button className=" primary-button ">Reserve Room!</button>
        </div>
      </div>
    </div>
  );
}
