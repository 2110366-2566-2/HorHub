import { Link } from "react-router-dom";

export default function DormCard({
  id,
  title,
  image,
  isAdding,
}: {
  id: string;
  title: string;
  image: string;
  isAdding?: boolean
}) {
  return (
    <li className={"group relative rounded-3xl bg-slate-50 p-6 hover:bg-slate-100"}>
      <div className="aspect-[672/494] relative rounded-md overflow-hidden shadow-[0_2px_8px_rgba(15,23,42,0.08)] bg-slate-200">
        <img
          alt=""
          width="672"
          height="494"
          className="absolute inset-0 w-full h-full  object-cover"
          style={{ color: "transparent" }}
          src={image}
        />
      </div>
      <div className="flex flex-wrap items-center mt-6">
        <h2 className="text-sm truncate leading-6 text-slate-900 group-hover:text-sky-500">
          <Link to={id}>
            <span className="absolute inset-0 rounded-3xl"></span>
            <p className="font-bold truncate text-base">{title}</p>
            
          </Link>
        </h2>
        {/* <svg
          className="w-6 h-6 flex-none opacity-0 group-hover:opacity-100"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M9.75 15.25L15.25 9.75M15.25 9.75H10.85M15.25 9.75V14.15"
            stroke="#0EA5E9"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg> */}
      </div>
    </li>
  );
}
