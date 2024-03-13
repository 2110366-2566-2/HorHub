import React, { useEffect, useState } from "react";
import { useUser } from "../../../lib/context/UserContext";
import { Dorm } from "../../../lib/type/Dorm";
import DormCard from "../../../components/Provider/DormCard";

const ProviderDormListPage = () => {
  const { currentUser, isLoading } = useUser();

  const [isFetching, setFetching] = useState<boolean>(true);
  const [isFetchFailed, setFetchFailed] = useState<boolean>(false);

  const [dormsData, setDormsData] = useState<Dorm[]>([]);

  async function getProviderDorm() {
    try {
      setFetching(true);

      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "/users/" +
          currentUser?.id +
          "/dorms",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) {
        setFetchFailed(true);
        setFetching(false);
        return;
      }

      const data = await res.json();
      setDormsData(data);
      console.log(data);
      setFetching(false);
    } catch (err) {
      setFetchFailed(true);
      setFetching(false);
    }
  }

  useEffect(() => {
    getProviderDorm();
  }, []);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="px-3 my-2 font-bold text-left text-xl">
        My Dorms
      </div>
      <div className="text-lg w-full">
        There are currently{" "}
        <span className="text-sky-700">{dormsData.length}</span> dorms that you
        have owned.
      </div>
      <ul className="grid max-w-[26rem] sm:max-w-[52.5rem] mt-[2rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-6 lg:gap-y-8 xl:gap-x-8 lg:max-w-7xl px-4 sm:px-6 lg:px-8">
        {dormsData
          .sort((a: Dorm, b: Dorm) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          })
          .map((data) => {
            return (
              <DormCard
                id={data.id}
                title={data.name}
                image={
                  data.images.length === 0
                    ? "https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/placeholders%2F681px-Placeholder_view_vector.png?alt=media&token=bc0c7178-b94a-4bf0-957b-42a75f708a79"
                    : data.images[0]
                }
              />
            );
          })}
        <DormCard
          id={"create"}
          title={"Add Dorm"}
          image={
            "https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/placeholders%2Fadd-icon-614x460.png?alt=media&token=29667317-43aa-4402-ba2e-7cee31215115"
          }
        />
      </ul>
    </div>
  );
};

export default ProviderDormListPage;
