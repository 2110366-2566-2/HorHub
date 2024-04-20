import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../lib/context/UserContext";
import LoadingPage from "../etc/LoadingPage";
import NotFoundPage from "../etc/NotFoundPage";
import { Issue } from "./SupportDashboard";
import { state_mapper } from "../../components/Issue/IssueCard";
import { FaRegClock, FaReply } from "react-icons/fa";
import { FcLock } from "react-icons/fc";
import TextAreaInput from "../../components/Form/TextAreaInput";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalButton from "../../components/Form/Button/ModalButton";
import { Bounce, toast } from "react-toastify";
import { FaUserCheck } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
const noImagePlaceholder =
  "https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/placeholders%2F681px-Placeholder_view_vector.png?alt=media&token=bc0c7178-b94a-4bf0-957b-42a75f708a79";

const adminUpdateIssueSchema = z.object({
  resolveMessage: z
    .string()
    .trim()
    .min(1, { message: "Please fill resolve message" }),
});

type AdminSchema = z.infer<typeof adminUpdateIssueSchema>;

export default function IssuePage() {
  const { issueId } = useParams();
  const { currentUser, isLoading } = useUser();
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [data, setData] = useState<Issue>();
  const [currentIdex, setCurrentIdex] = useState<number>(0);
  const navigate = useNavigate();
  const {
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors },
  } = useForm<AdminSchema>({
    resolver: zodResolver(adminUpdateIssueSchema),
  });

  const watchResolveMessage = watch("resolveMessage")

  const onSubmit_Resolve: SubmitHandler<AdminSchema> = async (data) => {
    const result = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/issues/" + issueId + "/resolve",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );
    if (result.ok) {
      const data = await result.json();
      toast.success("Resolve issue successfully!", {
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
        navigate("../../", { relative: "path" });
      }, 1000);
    }
  };
  const onSubmit_Reject: SubmitHandler<AdminSchema> = async (data) => {
    const result = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/issues/" + issueId + "/reject",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      }
    );
    if (result.ok) {
      const data = await result.json();
      toast.success("Reject issue successfully!", {
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
        navigate("../../", { relative: "path" });
      }, 1000);
    }
  };

  useEffect(() => {
    window.document.title = "Support | HorHub"

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
        console.log(data);
        setData(data);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };

    initData();
  }, []);
  if (isLoading || loading) return <LoadingPage />;
  if (notFound || !data) return <NotFoundPage />;
  if (!currentUser || currentUser.role !== "Admin") return <NotFoundPage />;
  return (
    <div className="page">
      <div className="flex w-full justify-between p-4">
        <div className="w-1/2 pr-6 ">
          {/* <h2 className="font-bold text-xl">Room Image</h2> */}
          <figure className="w-4/5 m-auto">
            {data.images.length > 0 ? (
              <img
                className="w-full aspect-square object-cover"
                src={data.images[currentIdex % data.images.length]}
              />
            ) : (
              <img
                className="w-full aspect-square object-cover"
                src={noImagePlaceholder}
              />
            )}
          </figure>
          <div className="flex gap-2 flex-wrap ">
            {data?.images.map((url, idx) => {
              return (
                <img
                  src={url}
                  width={60}
                  height={60}
                  className={
                    idx === currentIdex
                      ? "border-orange-400 border-2 object-cover w-[60px] h-[60px]"
                      : "object-cover w-[60px] h-[60px]"
                  }
                  onClick={() => {
                    setCurrentIdex(idx);
                  }}
                ></img>
              );
            })}
          </div>
        </div>
        <div className="w-1/2 p-2 flex flex-col gap-y-2">
          <div className="flex justify-between items-center">
            <div>
              Title : <span className="font-bold">{data.title}</span>
            </div>
            <div className={"badge badge-outline " + state_mapper(data.status)}>
              {data.status}
            </div>
          </div>
          <div>Description : {data.description}</div>
          <div className="flex items-center gap-2">
            <FaUser />
            <div>
              Report By :{" "}
              {`${data.user.firstName} ${data.user.lastName} (${data.user.displayName})`}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaRegClock />
            <div>Report At : {new Date(data.reportAt).toDateString()}</div>
          </div>

          {data.resolveMessage && (
            <div className="flex items-center gap-2">
              <FaReply />
              <div>Replied Message : {data.resolveMessage}</div>
            </div>
          )}
          {data.resolver && (
            <div className="flex items-center gap-2">
              <FaUserCheck />
              <div>
                Resolve By :{" "}
                {`${data.resolver.firstName} ${data.resolver.lastName} (${data.resolver.displayName})`}
              </div>
            </div>
          )}
          {data.resolveAt && (
            <div className="flex items-center gap-2">
              <FcLock />
              <div>Resolve At : {new Date(data.resolveAt).toDateString()}</div>
            </div>
          )}
          {data.status === "Waiting" ? (
            <form>
              <TextAreaInput
                fieldName={"Message to user"}
                placeholder={"Say something to your client"}
                name={"resolveMessage"}
                register={register}
                error={errors.resolveMessage}
              ></TextAreaInput>
              <div className="flex justify-around">
                {
                  (!watchResolveMessage || watchResolveMessage.trim() === "") ? <button type="button" className="disabled-button" disabled>Resolve</button>
                  : (
                    <ModalButton
                      buttonText="Resolve"
                      title={"Resolve this issue"}
                      description={"Are you sure to resolve this issue?"}
                      customClass="primary-button"
                      onClick={() => {
                        handleSubmit(onSubmit_Resolve)();
                      }}
                      type="submit"
                    />
                  )
                }
                
                {
                  (!watchResolveMessage || watchResolveMessage.trim() === "") ? <button type="button" className="disabled-button" disabled>Reject</button>
                  : (
                    <ModalButton
                      buttonText="Reject"
                      title={"Reject this issue"}
                      description={"Are you sure to reject this issue?"}
                      onClick={() => {
                        handleSubmit(onSubmit_Reject)();
                      }}
                      type="submit"
                    />
                  )
                }
                
              </div>
            </form>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
