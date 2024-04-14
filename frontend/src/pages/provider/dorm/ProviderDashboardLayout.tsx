import { ReactNode, useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Dorm, dormSchema } from "../../../lib/type/Dorm";
import NotFoundPage from "../../etc/NotFoundPage";
import LoadingPage from "../../etc/LoadingPage";
import { useUser } from "../../../lib/context/UserContext";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

export default function ProviderDashboardLayout() {
  const { id } = useParams();

  const location = useLocation();
  const currentPath = location.pathname.split("dorms/")[1].split("/")[1];
  const [isLoading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const deleteDorm = async () => {
    const result = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/dorms/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    console.log(result);
    if (result.ok) {
      navigate("..", { relative: "path" });
    }
    console.log(await result.json());
  };
  useEffect(() => {
    const fetchData = async () => {
      console.log(process.env.REACT_APP_BACKEND_URL + "/dorms/" + id);
      const result = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/dorms/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!result.ok) {
        // TODO : use 🍞 toast to notify
        setLoading(false);
        setNotFound(true);
        return;
        //return navigate("/");
      } else {
        const tmp = await result.json();
        const data = dormSchema.safeParse(tmp);

        if (!data.success) {
          console.log(data.error);
          return;
        }
        console.log(data.data.provider);
        if (!currentUser || currentUser.id !== data.data.provider.id) {
          setNotFound(true);
        }
        setName(data.data.name);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (notFound) return <NotFoundPage />;
  if (isLoading) return <LoadingPage />;
  return (
    <div className="flex flex-col justify-start text-left gap-y-2">
      <div className="flex w-full justify-between">
        <div className="px-3 my-2 font-bold text-left text-xl">{name}</div>
        <div className="w-fit h-fit flex gap-3">
          <Link to="edit" className="bordered-button">
            Edit
          </Link>
          <button onClick={handleOpen} className="danger-button">
            Delete
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className="modal-box">
              <div className="flex flex-col gap-y-6">
                {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                  Do you really want to delete this dorm?
                </Typography> */}
                <div className="font-bold text-lg text-center">
                  Deleting Dorm
                </div>

                <div className="text-sm">Are you sure to delete this dorm?</div>
                <div className="flex gap-5">
                  <button
                    className="bordered-button w-full"
                    onClick={handleClose}
                  >
                    No
                  </button>
                  <button className="danger-button w-full" onClick={deleteDorm}>
                    Yes
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </div>

      <ul className="flex place-content-between items-center text-center">
        <li className="w-full ">
          <Link
            to="info"
            className={
              "block w-full px-2 border-b-4  hover:bg-slate-600/10 hover:border-indigo-600 items-center  hover:text-indigo-600 font-bold text-lg" +
              (currentPath === "info"
                ? " border-indigo-600 items-center :text-indigo-600 "
                : " border-white text-slate-400")
            }
          >
            Information
          </Link>
        </li>
        <li className="w-full">
          <Link
            to="reservation"
            className={
              "block w-full px-2 border-b-4 hover:bg-slate-600/10 hover:border-indigo-600 items-center hover:text-indigo-600 font-bold text-lg" +
              (currentPath === "reservation"
                ? " border-indigo-600 items-center :text-indigo-600 "
                : " border-white text-slate-400")
            }
          >
            Reservation
          </Link>
        </li>
        {/* <li className="w-full">
          <Link
            to="edit"
            className={
              "block w-full px-2 border-b-4 border-white hover:bg-slate-600/10 hover:border-indigo-600 items-center text-slate-400 hover:text-indigo-600 font-bold text-lg"
            }
          >
            Edit Dorm
          </Link>
        </li> */}
        {/* <li className="w-full ">
          <button
            onClick={handleOpen}
            className="block w-full px-2 border-b-4 border-white hover:bg-slate-600/10 hover:border-indigo-600 items-center text-slate-400 hover:text-indigo-600 font-bold text-lg"
          >
            Delete Dorm
          </button>
          
        </li> */}
      </ul>
      <Outlet />
    </div>
  );
}
