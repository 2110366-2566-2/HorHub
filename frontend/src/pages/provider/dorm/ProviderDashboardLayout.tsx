import { ReactNode, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
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
  const [open, setOpen] = useState<boolean>(false);

  const [isLoading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const { currentUser } = useUser();
  const navigate = useNavigate();
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
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (notFound) return <NotFoundPage />;
  if (isLoading) return <LoadingPage />;
  return (
    <div className="flex flex-col justify-start text-left">
      <ul className="flex place-content-between items-center text-center">
        <li className="w-full primary-button">
          <Link to="info" className={"text-white block w-full"}>
            Information
          </Link>
        </li>
        <li className="w-full primary-button">
          <Link to="reservation" className={"text-white block w-full"}>
            Reservation
          </Link>
        </li>
        <li className="w-full primary-button ">
          <Link to="edit" className={"text-white block w-full"}>
            Edit Dorm
          </Link>
        </li>
        <li className="w-full ">
          <button onClick={handleOpen} className="w-full danger-button">
            Delete Dorm
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="flex flex-col gap-y-6">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Do you really want to delete this dorm?
                </Typography>
                <div className="flex ">
                  <button
                    className="primary-button w-full"
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
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
