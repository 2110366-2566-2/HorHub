import useAuthRedirect from "../../lib/authRedirect";
import { useUser } from "../../lib/context/UserContext";
import LoadingPage from "../etc/LoadingPage";
import NotFoundPage from "../etc/NotFoundPage";
import { useEffect, useState } from "react";
import { ImageType } from "react-images-uploading";
import { uploadImages } from "../../lib/firebase";
import ImagesInput from "../../components/Form/ImagesInput";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectionInput from "../../components/Form/SelectionInput";
import TextAreaInput from "../../components/Form/TextAreaInput";
import TextInput from "../../components/Form/TextInput";
import { useNavigate, useParams } from "react-router-dom";
import { relative } from "path";
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
  title: z.string().trim().min(1, { message: "Please fill title" }).max(128, { message: "Title should not exceed 128 characters" }),
  description: z.string().trim().min(1, { message: "Please fill description" }).max(5000, { message: "Description should not exceed 5000 characters" }),
  images: z
    .string()
    .array()
    .max(10, { message: "The images must not exceed 10 files" })
    .optional(),
});

type CreateIssueSchemaType = z.infer<typeof createIssueSchema>;

export default function EditIssuePage() {
  const { currentUser, isLoading } = useUser();
  const { issueId } = useParams();
  const [images, setImages] = useState<ImageType[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateIssueSchemaType>({
    resolver: zodResolver(createIssueSchema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<CreateIssueSchemaType> = async (data) => {
    if (!currentUser) {
      return false;
    }
    const imagesURL = await uploadImages(images, "issues/images");
    try {
      const result = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/issues/" + issueId,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, images: imagesURL }),
          credentials: "include",
        }
      );

      if (result.ok) {
        toast.success("Editing Issue successfully!", {
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
        const data = await result.json();
        setTimeout(() => {
          navigate("../../", { relative: "path" });
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const initData = async () => {
      const result = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/issues/" + issueId,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (result.ok) {
        const data = await result.json();
        reset(data);
        const imagesURL = data.images;
        const imagesMockFiles: ImageType[] = imagesURL.map((url: string) => {
          return { dataURL: url };
        });
        setImages(imagesMockFiles);
        console.log(data);
      }
    };
    initData();
  }, []);

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
        <div className="flex justify-center gap-2">
          <button className="primary-button" type="submit">
            Update
          </button>

          <button
            className="danger-button"
            type="button"
            onClick={() => {
              navigate("../../", { relative: "path" });
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
