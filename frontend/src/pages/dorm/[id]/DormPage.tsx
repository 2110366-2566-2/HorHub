import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../etc/LoadingPage";
import NotFoundPage from "../../etc/NotFoundPage";
import z from "zod";
import { Dorm, dormSchema } from "../../../lib/type/Dorm";
import DormBanner from "../../../components/Dorm/DormBanner";
import RoomCard from "../../../components/Dorm/RoomCard";
import { isCompositeComponent } from "react-dom/test-utils";
import DormMap from "../../../components/Dorm/DormMap";
import { availableDormFacilities } from "../../../lib/constants/dormFacilities";
import AddRoomCard from "../../../components/Dorm/AddRoomCard";

export default function DormPage({ isEdit }: { isEdit: boolean }) {
  const { id } = useParams();
  const [dormData, setDormData] = useState<Dorm | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const navigate = useNavigate();
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
        setNotFound(true);
        return;
        //return navigate("/");
      } else {
        const tmp = await result.json();
        console.log(tmp);
        const data = dormSchema.safeParse(tmp);

        if (!data.success) {
          console.log(data.error);
          return;
        }
        setDormData(data.data);
        window.document.title = data.data.name + " | HorHub"
      }
    };
    fetchData();
  }, []);
  console.log(dormData?.latitude);
  console.log(dormData?.longitude);
  if (notFound) return <NotFoundPage />;
  if (!dormData) return <LoadingPage />;

  return (
    <div className="unpadding-page px-0">
      <DormBanner
        dormName={dormData.name}
        agencyName={dormData.provider.displayName}
        address={dormData.address}
        contactNo={dormData.contractNumber}
        dormFacility={dormData.dormFacilities}
      />
      <div className="flex flex-row p-4 md:w-4/5 w-full text-base">
        <div className="w-3/4">
          <div className="flex flex-col gap-4 pr-4">
            <div className="font-bold text-base">Dorm Description</div>
            <div className="whitespace-pre-line text-sm">{dormData.description}</div>
            <div className="font-bold text-base">Dorm Facilities</div>
            <div className="flex flex-wrap gap-2">
              {
                (dormData.dormFacilities.length === 0) && <div className="text-sm">There is no facilities</div>
              }
              {availableDormFacilities
                .filter((fac) =>
                  dormData.dormFacilities.includes(fac.value as any)
                )
                .map((fac, idx) => {
                  return (
                    <div className="w-60 border border-slate-300 px-3 py-2 rounded-md flex gap-2 hover:bg-indigo-50 transition-colors">
                      {fac.label}
                    </div>
                  );
                })}
            </div>
            <div className="font-bold">Dorm Room</div>
            <div className="gap-3 space-y-3">
              {
                (!isEdit && dormData.roomTypes.length === 0) && <div className="text-sm">There is no room available</div>
              }
              {dormData.roomTypes.map((obj) => {
                return (
                  <RoomCard
                    dormId={id || ""}
                    roomId={obj.id}
                    name={obj.name}
                    cost={obj.cost}
                    capacity={obj.capacity}
                    size={obj.size}
                    roomFacilities={obj.roomFacilities}
                    description={obj.description}
                    numberOfAvailableRoom={obj.numberOfAvailableRoom}
                    numberOfRoom={obj.numberOfRoom}
                    images={obj.images}
                    isEdit={isEdit}
                  />
                );
              })}
              {isEdit && <AddRoomCard />}
            </div>
            <div className="font-bold">Dorm Map</div>
            <DormMap lat={dormData.latitude} lng={dormData.longitude} />
          </div>
        </div>
        <div className="w-1/4">
          {/* <div className="font-bold">Dorm Image</div> */}
          <div className="flex flex-col gap-3">
            {dormData.images.map((url) => {
              return <img src={url}></img>;
            })}
          </div>
        </div>
      </div>
      {/*TODO : ADD MAP*/}
      <div></div>
    </div>
  );
}
