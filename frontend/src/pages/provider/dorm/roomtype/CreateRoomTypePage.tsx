import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useUser } from "../../../../lib/context/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImageType } from "react-images-uploading";
import { uploadImages } from "../../../../lib/firebase";
import { Bounce, toast } from "react-toastify";
import LoadingPage from "../../../etc/LoadingPage";
import NotFoundPage from "../../../etc/NotFoundPage";
import TextInput from "../../../../components/Form/TextInput";
import TextAreaInput from "../../../../components/Form/TextAreaInput";
import ImagesInput from "../../../../components/Form/ImagesInput";
import NumberInput from "../../../../components/Form/NumberInput";
import CheckboxesInput from "../../../../components/Form/CheckboxesInput";
import { availableRoomFacilities } from "../../../../lib/constants/roomFacilities";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Fill dorm name" })
    .max(100, { message: "Your room name must not exceed 100 characters" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Fill description" })
    .max(5000, { message: "Description must not exceed 5000 characters" }),
  size: z.coerce
    .number()
    .min(1, { message: "Fill valid size in unit of square meter" })
    .max(10000000, { message: "Too big?" }),
  cost: z.coerce
    .number()
    .min(300, { message: "The cost should be more than 300 baht per month" })
    .multipleOf(0.01, { message: "Fill valid cost in 2 decimal places" })
    .max(200000, { message: "The cost should not exceed 200000 baht per month" }),
  capacity: z.coerce
    .number()
    .min(1, { message: "Fill valid room capacity" })
    .max(10000000, { message: "Too large?" }),
  roomFacilities: z.string().array(),
});

type ValidationSchemaType = z.infer<typeof schema>;

const CreateRoomTypePage = () => {
  const navigate = useNavigate();

  let { dormId } = useParams();

  const { currentUser, isLoading, fetchUser } = useUser();

  const [roomImages, setRoomImages] = useState<ImageType[]>([]);

  const [allowSubmit, setAllowSubmit] = useState<boolean>(true);
  const [isFetching, setFetching] = useState<boolean>(true);
  const [isInvalid, setInvalid] = useState<boolean>(false);
  const [ownerId, setOwnerId] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      roomFacilities: [],
    },
  });

  const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
    setAllowSubmit(false);

    await fetchUser();
    if (!currentUser) {
      return;
    }

    const imagesURL = await uploadImages(roomImages, "rooms/images");
    console.log(imagesURL);
    const result = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/dorms/" + dormId + "/roomtypes",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, images: imagesURL }),
      }
    );

    if (result.ok) {
      // Done

      toast.success("Creating room successfully!", {
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
        navigate("/provider/dorms/" + dormId);
      }, 1000);
    } else {
      setAllowSubmit(true);
    }
  };

  async function checkData() {
    setFetching(true);
    // await fetchUser();
    // if (!currentUser) {
    //     return
    // }
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/dorms/" + dormId,
        {
          method: "GET",
          credentials: "include",
        }
      );
      console.log("Hi");
      if (res.ok) {
        const data = await res.json();

        setOwnerId(data.providerId);
        setFetching(false);
      } else {
        setInvalid(true);
        setFetching(false);
      }
    } catch (err) {
      setInvalid(true);
      setFetching(false);
    }
  }

  useEffect(() => {
    checkData();
  }, []);

  useEffect(() => {
    document.title = "Creating Room | HorHub";
  }, []);

  if (isLoading || isFetching) {
    return <LoadingPage />;
  }

  if (!currentUser || isInvalid) {
    return <NotFoundPage />;
  }

  if (
    currentUser &&
    (currentUser.role === "Customer" || ownerId != currentUser.id)
  ) {
    return <NotFoundPage />;
  }

  return (
    <div className="page">
      <div className="w-full flex flex-col">
        <div className="border-b border-slate-300 my-2 font-bold text-left pt-2">
          Creating Room
        </div>
        <div className="text-sm w-full text-left">
          Please fill the following information to create a type of room
        </div>
        <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            type="text"
            name="name"
            fieldName="Room Name"
            placeholder="Name..."
            register={register}
            error={errors.name}
          />

          <TextAreaInput
            name="description"
            fieldName="Description"
            placeholder="Fill your room description here"
            register={register}
            error={errors.description}
          />

          <ImagesInput
            fieldName="Room Images"
            maxNumber={5}
            images={roomImages}
            setImages={setRoomImages}
          />

          <div className="border-b border-slate-300 my-2 font-bold text-left pt-2">
            Room Properties
          </div>

          <NumberInput
            name="size"
            fieldName="Room Size (in square meters)"
            placeholder="20"
            step={1}
            register={register}
            error={errors.size}
          />

          <NumberInput
            name="capacity"
            fieldName="Room Capacity (How many people can live in)"
            placeholder="0"
            step={1}
            register={register}
            error={errors.capacity}
          />

          <NumberInput
            name="cost"
            fieldName="Room Price (per month in Thai baht)"
            placeholder="0.00"
            step={0.01}
            register={register}
            error={errors.cost}
          />

          <div className="border-b border-slate-300 my-2 font-bold text-left pt-2">
            Facilities
          </div>

          <CheckboxesInput
            fieldName="Please select all facilities in this room"
            name="roomFacilities"
            choices={availableRoomFacilities}
            register={register}
          />

          <div className="w-full flex justify-start pt-5">
            {allowSubmit ? (
              <button id="create_room_submit" type="submit" className="primary-button">
                Create Room
              </button>
            ) : (
              <button className="disabled-button" disabled>
                Create Room
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomTypePage;
