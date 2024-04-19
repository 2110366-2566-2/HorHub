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
  const deleteIssue = async () => {
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
    }
    console.log(await result.json());
  };
  return (
    <div className="card w-full bg-base-200 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title flex items-center">
            {title + " "}
            <div className="badge badge-primary badge-outline">{type}</div>
          </h2>
          <div className={"badge badge-outline " + state_mapper(status)}>
            {status}
          </div>
        </div>
        <p>{description}</p>
        <div className="flex items-center gap-2">
          <FaUser />
          <div>
            Report By :{" "}
            {`${user.firstName} ${user.lastName} (${user.displayName})`}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaRegClock />
          <div>Report At : {new Date(reportAt).toDateString()}</div>
        </div>

        {resolveMessage && (
          <div className="flex items-center gap-2">
            <FaReply />
            <div>Replied Message : {resolveMessage}</div>
          </div>
        )}
        {resolver && (
          <div className="flex items-center gap-2">
            <FaUserCheck />
            <div>
              {status == "Resolved" ? "Resolved " : "Rejected "} By :{" "}
              {`${resolver.firstName} ${resolver.lastName} (${resolver.displayName})`}
            </div>
          </div>
        )}
        {resolveAt && (
          <div className="flex items-center gap-2">
            <FcLock />
            <div>
              {status == "Resolved" ? "Resolved " : "Rejected "} At :{" "}
              {new Date(resolveAt).toDateString()}
            </div>
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="card-actions justify-start flex">
            {images.map((url) => {
              return <ImageModal image={url} />;
            })}
          </div>
          <div className="flex gap-x-2">
            {role !== "Admin" ? (
              status === "Waiting" ? (
                <>
                  <Link className="primary-button" to={id + "/edit"}>
                    View & Edit Issue
                  </Link>
                  <ModalDeleteButton
                    buttonText={"Delete Issue"}
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
