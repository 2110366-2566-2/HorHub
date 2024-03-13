import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";

export default function AddRoomCard() {
  return (
    <Link to={"../rooms/create"} className="card bg-slate-100 hover:bg-slate-200 w-96 shadow-xl transition-colors">
      <div className="card-body flex flex-col items-center">
        <IoMdAddCircle className="w-8 h-8 text-black"/>
        <div className="card-title font-bold text-base text-black">Add New Room</div>
      </div>
    </Link>
  );
}
