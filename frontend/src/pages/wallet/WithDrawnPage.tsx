import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../lib/context/UserContext";
import LoadingPage from "../etc/LoadingPage";
import useAuthRedirect from "../../lib/authRedirect";
import { useEffect, useState } from "react";

function WithDrawnPage() {
  const { currentUser, isLoading, fetchUser } = useUser();
  const [bank, setbank] = useState([]);
  async function initData() {
    await fetchUser();
    if (!currentUser) {
      return;
    }
    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL +
        "/users/" +
        currentUser.id +
        "/paymentMethods",
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await res.json();
    if (!data[0]) {
      return;
    }
    console.log(data[0].info);
    setbank(data[0].info.split("-"));
  }
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/settings/payment_information`;
    navigate(path);
  };
  useEffect(() => {
    initData();
  }, [isLoading]);
  useAuthRedirect();
  if (isLoading) return <LoadingPage />;
  if (!currentUser) return <LoadingPage />;
  console.log(bank);
  return (
    <div className="w-full h-[calc(100vh-7rem)] flex flex-row px-20">
      <div className="mt-10 flex-1 container flex flex-col items-center xl:gap-6 min-h-3/6 w-8/12">
        <div className="text-base text-center md:text-2xl lg:text-3xl font-bold 2xl:text-5xl flex-col items-start">
          Account Information
        </div>
        <div className="overflow-clip bg-contain space-y-4 px-6 py-6 2xl:space-y-8 2xl:px-12 2xl:py-12  inline content-center box-content min-h-2/3 w-2/3 bg-indigo-100 rounded-3xl ">
          <p className="md:text-2xl font-bold 2xl:text-4xl text-indigo-700 ">
            Name
          </p>
          <p className="md:text-2xl font-bold 2xl:text-4xl">
            {currentUser.firstName + " " + currentUser.lastName}
          </p>
          <p className="md:text-2xl font-bold 2xl:text-4xl text-indigo-700">
            Bank Name
          </p>
          <p className="md:text-2xl font-bold 2xl:text-4xl">{bank[0]}</p>
          <p className="md:text-2xl font-bold 2xl:text-4xl text-indigo-700">
            Account No.{" "}
          </p>
          <p className="md:text-2xl font-bold 2xl:text-4xl">{bank[1]}</p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={routeChange}
              className="hover:bg-slate-700 bg-clip-border px-8 py-5 bg-indigo-700 text-lg 2xl:text-2xl text-white rounded-3xl"
            >
              Edit Bank Account
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 pt-20 ">
        <p className="text-center text-lg text-indigo-600">Usable Balance</p>
        <p className="text-center text-6xl">฿ 13,456.78</p>
        <p className="py-8 text-center text-lg text-indigo-600">
          ** Please note that Usable Balance calculated from refund period of
          customers.
        </p>
        <p className="pb-2 text-center text-lg text-indigo-600">
          Fill Amount of Money.
        </p>
        <div className="flex items-center justify-center">
          <input
            type="number"
            placeholder="1234"
            className="border-current border-2 rounded-2xl text-lg p-4 "
          ></input>
        </div>
        <div className="py-5 flex items-center justify-center">
          <button
            type="button"
            className="hover:bg-slate-700 bg-clip-border px-8 py-5  bg-indigo-700 text-lg 2xl:text-2xl text-white rounded-3xl"
          >
            {" "}
            💸 Confirm Withdrawn
          </button>
        </div>
        <p className="text-center text-lg text-red-700">
          Account information should be provided before withdrawing
        </p>
      </div>
    </div>
  );
}
export default WithDrawnPage;
