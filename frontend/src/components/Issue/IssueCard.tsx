import { Link, useNavigate } from "react-router-dom";
import { Issue } from "../../pages/support/SupportDashboard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import ModalDeleteButton from "../Form/Button/ModalButton";
import { FaRegClock, FaUser, FaUserCheck } from "react-icons/fa";
import { FaReply } from "react-icons/fa";
import { FcLock } from "react-icons/fc";
import ImageModal from "../Image/ImageModal";
import IssueTag from "./IssueTag";
export const state_mapper = (status: string) => {
  switch (status) {
    case "Waiting":
      return "badge-warning";
    case "Resolved":
      return "badge-success";
    case "Rejected":
      return "badge-error";
    default:
      return "";
  }
};

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

export default function IssueCard({
  id,
  images,
  reportAt,
  resolveAt,
  resolveMessage,
  description,
  status,
  user,
  resolver,
  title,
  type,
  role,
}: Issue & { role: string }) {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState<boolean>(false);
  const deleteIssue = async () => {
    setDisabled(true);
    const result = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/issues/" + id,
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
      navigate(0);
    } else {
      setDisabled(false);
    }
  };
  return (
    <div className="card w-full bg-base-200 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center gap-2">
          <h2 className="card-title flex items-center text-lg">
            {title + " "}
            <div className="badge badge-primary badge-outline text-xs">
              {type}
            </div>
          </h2>
          {/* <div className={"badge badge-outline " + state_mapper(status)}>
            {status}
          </div> */}
          <IssueTag status={status} />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FaUser />
          <div>
            <span className="font-bold">Report By :</span>{" "}
            {`${user.firstName} ${user.lastName} (${user.displayName})`}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <FaRegClock />
          <div>
            <span className="font-bold">Report At :</span>{" "}
            {new Date(reportAt).toLocaleString()}
          </div>
        </div>
        {resolver && (
          <div className="flex items-center gap-2 text-sm">
            <FaUserCheck />
            <div>
              <span className="font-bold">
                {status === "Resolved" ? "Resolve" : "Reject"} By :
              </span>{" "}
              {`${resolver.firstName} ${resolver.lastName} (${resolver.displayName})`}
            </div>
          </div>
        )}
        {resolveAt && (
          <div className="flex items-center gap-2 text-sm">
            <FcLock />
            <div>
              <span className="font-bold">
                {status === "Resolved" ? "Resolve" : "Reject"} At :
              </span>{" "}
              {new Date(resolveAt).toLocaleString()}
            </div>
          </div>
        )}
        <div className="w-full mt-3">
          <p className="text-sm whitespace-pre-line break-words">
            {description}
          </p>
        </div>

        {images.length > 0 && (
          <div className="flex overflow-x-auto items-center w-full mt-3">
            <div className="flex gap-3">
              {images.map((img, idx) => {
                return <ImageModal key={idx} image={img} />;
              })}
            </div>
          </div>
        )}
        {resolveMessage && (
          <div className="flex flex-col gap-2 text-sm mt-3">
            <div className="flex items-center gap-2">
              <FaReply />
              <div className="font-bold">Replied Message From Admin:</div>
            </div>
            <p className="whitespace-pre-line break-words">{resolveMessage}</p>
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="card-actions justify-start"></div>
          <div className="flex gap-x-2">
            {role !== "Admin" ? (
              status === "Waiting" ? (
                <>
                  <Link className="primary-button" to={id + "/edit"}>
                    Edit
                  </Link>
                  <ModalDeleteButton
                    disabled={disabled}
                    buttonText={"Delete"}
                    title={"Deleting Issue"}
                    description="Are you sure to delete this issue?"
                    onClick={deleteIssue}
                  />
                </>
              ) : (
                <></>
              )
            ) : (
              <>
                <Link className="primary-button" to={id + "/view"}>
                  View
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
