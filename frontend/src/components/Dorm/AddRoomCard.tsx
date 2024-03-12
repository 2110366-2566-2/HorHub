import { Link } from "react-router-dom";

export default function AddRoomCard() {
  return (
    <div className="card bg-slate-300 w-96 shadow-xl ">
      <div className="card-body">
        <div className="card-title">Add new room</div>
        <div className="card-actions justify-end">
          <Link className={"primary-button"} to={"../rooms/create"}>
            +
          </Link>
        </div>
      </div>
    </div>
  );
}
