import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../../etc/LoadingPage";
import NotFoundPage from "../../etc/NotFoundPage";
import z from "zod";
import { Dorm, dormSchema } from "../../../lib/type/Dorm";
import DormBanner from "../../../components/Dorm/DormBanner";
import RoomCard from "../../../components/Dorm/RoomCard";

export default function DormPage() {
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
      if (result.status === 404) {
        // TODO : use 🍞 toast to notify
        setNotFound(true);
        return;
        //return navigate("/");
      } else {
        const tmp = await result.json();
        console.log(tmp);
        const data = dormSchema.safeParse(tmp);
        if (!data.success) return;
        setDormData(data.data);
      }
    };
    fetchData();
  }, []);
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
      <div className="flex flex-row p-4 md:w-4/5 w-full">
        <div className="w-3/4">
          <div className="flex flex-col gap-4">
            <div className="font-bold">Dorm Description</div>
            <div>{dormData.description}</div>
            <div className="font-bold">Dorm Room</div>
            <div>
              {dormData.roomTypes.map((obj) => {
                return (
                  <RoomCard
                    name={obj.name}
                    cost={obj.cost}
                    capacity={obj.capacity}
                    size={obj.size}
                    roomFacilities={obj.roomFacilities}
                    description={obj.description}
                    numberOfAvailableRoom={obj.numberOfAvailableRoom}
                    numberOfRoom={obj.numberOfRoom}
                    images={obj.images}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <div className="font-bold">Dorm Image</div>
          <div className="flex flex-col">
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
