import { relative } from "path";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

export default function AddIssueCard() {
  return (
    <Link
      to={"create/"}
      relative={"path"}
      className="card bg-slate-100 hover:bg-slate-200 w-full shadow-xl transition-colors"
    >
      <div className="card-body flex flex-col items-center">
        <IoMdAddCircle className="w-8 h-8 text-black" />
        <div className="card-title font-bold text-base text-black">
          Add New Issue
        </div>
      </div>
    </Link>
  );
}
