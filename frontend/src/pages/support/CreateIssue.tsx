import useAuthRedirect from "../../lib/authRedirect";
import { useUser } from "../../lib/context/UserContext";
import LoadingPage from "../etc/LoadingPage";
import NotFoundPage from "../etc/NotFoundPage";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { Button, OutlinedInput, TextField } from "@mui/material";
import { ImageType } from "react-images-uploading";
import { uploadImages } from "../../lib/firebase";
import ImagesInput from "../../components/Form/ImagesInput";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectInput from "@mui/material/Select/SelectInput";
import SelectionInput from "../../components/Form/SelectionInput";
import TextAreaInput from "../../components/Form/TextAreaInput";
import TextInput from "../../components/Form/TextInput";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const IssueType = [
  "Technical",
  "Account",
  "Content",
  "Payment",
  "Security",
  "Suggestion",
  "Other",
] as const;

const option = [
  {
    value: "Technical",
    children: "Technical",
  },
  {
    value: "Account",
    children: "Account",
  },
  {
    value: "Content",
    children: "Content",
  },
  {
    value: "Payment",
    children: "Payment",
  },
  {
    value: "Security",
    children: "Security",
  },
  {
    value: "Suggestion",
    children: "Suggestion",
  },
  {
    value: "Other",
    children: "Other",
  },
];

const createIssueSchema = z.object({
  type: z.enum(IssueType),
  title: z
    .string()
    .trim()
    .min(1, { message: "Please fill title" })
    .max(128, { message: "Title should not exceed 128 characters" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Please fill description" })
    .max(5000, { message: "Description should not exceed 5000 characters" }),
  images: z
    .string()
    .array()
    .max(10, { message: "The images must not exceed 10 files" })
    .optional(),
});

type CreateIssueSchemaType = z.infer<typeof createIssueSchema>;

export default function CreateIssue() {
  const { currentUser, isLoading } = useUser();
  const [images, setImages] = useState<ImageType[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateIssueSchemaType>({
    resolver: zodResolver(createIssueSchema),
  });
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState<boolean>(false);

  const onSubmit: SubmitHandler<CreateIssueSchemaType> = async (data) => {
    if (!currentUser) {
      return false;
    }
    setDisabled(true);
    const imagesURL = await uploadImages(images, "issues/images");
    try {
      const newData = { ...data, images: imagesURL };
      const result = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/issues",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
          credentials: "include",
        }
      );

      if (result.ok) {
        const data = await result.json();
        toast.success("Create Issue successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("../", { relative: "path" });
        }, 1000);
      } else {
        setDisabled(false);
      }
    } catch (err) {
      setDisabled(false);
      console.log(err);
    }
  };

  useAuthRedirect();
  if (isLoading) return <LoadingPage />;
  if (!currentUser || currentUser.role === "Admin") return <NotFoundPage />;
  return (
    <div className="page">
      <form
        className="flex flex-col gap-y-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <SelectionInput
          fieldName={"Select Issue Type"}
          placeholder={"select Issue"}
          name={"type"}
          options={option}
          register={register}
          error={errors.type}
        />
        <TextInput
          type={"text"}
          fieldName={"Title"}
          placeholder={"Title"}
          name={"title"}
          register={register}
          error={errors.title}
        />

        <TextAreaInput
          fieldName={"Send message to Admin"}
          placeholder={"type something"}
          name={"description"}
          register={register}
          error={errors.description}
        />

        <ImagesInput
          fieldName={"Send your image to Admin"}
          maxNumber={10}
          images={images}
          setImages={setImages}
        />
        <div className="flex justify-center">
          <button
            className={disabled ? "disabled-button" : "primary-button"}
            type="submit"
            disabled={disabled}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
