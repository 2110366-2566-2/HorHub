import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";

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

export default function ModalDeleteButton({
  buttonText,
  title,
  description,
  onClick,
  type,
  disable,
  customClass,
}: {
  buttonText: string;
  title: string;
  description: string;
  type?: "button" | "submit";
  customClass?: string;
  disable?: boolean;
  onClick: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const selected_btn_class = customClass ? customClass : "danger-button";
  return (
    <>
      <button
        onClick={handleOpen}
        className={selected_btn_class}
        disabled={disable}
        type={"button"}
      >
        {buttonText}
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
            <div className="font-bold text-lg text-center">{title}</div>

            <div className="text-sm">{description}</div>
            <div className="flex gap-5">
              <button
                className="bordered-button w-full"
                type="button"
                onClick={handleClose}
              >
                No
              </button>
              <button
                className={`${selected_btn_class} w-full`}
                type={type ? type : "button"}
                onClick={onClick}
              >
                Yes
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
