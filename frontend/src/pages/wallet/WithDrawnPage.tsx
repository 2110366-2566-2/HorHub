import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../lib/context/UserContext";
import LoadingPage from "../etc/LoadingPage";
import useAuthRedirect from "../../lib/authRedirect";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';

function WithDrawnPage() {
  const { currentUser, isLoading, fetchUser } = useUser();
  const [bank, setbank] = useState([]);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [isFail, setFail] = useState<boolean>(false);
  const [noAccount, setNoAccount] = useState<boolean>(false);
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
    window.document.title = "Withdraw | HorHub"
  }, [])

  useEffect(() => {
    initData();
  }, [isLoading]);
  useAuthRedirect();

  const withdrawn_handle = async () => {
    const result = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/auth/withdrawn",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: !amount ? 0 : amount.toFixed(2) }),
      }
    );
    if (result.ok) {
      setNoAccount(false);
      setFail(false);
      console.log(result);
      console.log(await result.json());
      navigate(0);
    } else if (result.status === 400) {
      setNoAccount(true);
    } else {
      setFail(true);
      setNoAccount(false);
    }
  };
  console.log();
  if (isLoading) return <LoadingPage />;
  if (!currentUser) return <LoadingPage />;
  console.log(bank);
  return (
    <div className="w-full h-[calc(100vh-7rem)] flex flex-row px-20">
      <div className="mt-10 flex-1 container flex flex-col items-center xl:gap-6 min-h-3/6 w-8/12">
        <div className="text-base text-center md:text-xl lg:text-2xl font-bold 2xl:text-3xl flex-col items-start">
          Account Information
        </div>
        <div className="overflow-clip bg-contain space-y-4 px-6 py-6 2xl:space-y-8 2xl:px-12 2xl:py-12  inline content-center box-content min-h-2/3 w-2/3 bg-indigo-100 rounded-3xl ">
          <p className="md:text-lg font-bold 2xl:text-2xl text-indigo-700 ">
            Name
          </p>
          <p className="md:text-lg font-bold 2xl:text-2xl">
            {currentUser.firstName + " " + currentUser.lastName}
          </p>
          <p className="md:text-lg font-bold 2xl:text-2xl text-indigo-700">
            Bank Name
          </p>
          <p className="md:text-lg font-bold 2xl:text-2xl">{bank[0]}</p>
          <p className="md:text-lg font-bold 2xl:text-2xl text-indigo-700">
            Account No.{" "}
          </p>
          <p className="md:text-lg font-bold 2xl:text-2xl">{bank[1]}</p>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={routeChange}
              className="hover:bg-indigo-600 bg-clip-border px-8 py-5 bg-indigo-500 text-lg 2xl:text-xl text-white rounded-3xl transition-colors"
            >
              Edit Bank Account
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 pt-20 ">
        <p className="text-center text-lg text-indigo-600">Usable Balance</p>
        <p className="text-center text-6xl">
          ฿ {currentUser.balance ? currentUser.balance.toFixed(2) : 0}
        </p>
        {/* <p className="py-8 text-center text-lg text-indigo-600">
          ** Please note that Usable Balance calculated from refund period of
          customers.
        </p> */}
        <p className="pt-8 pb-2 text-center text-lg text-indigo-600">
          Fill Amount of Money.
        </p>
        <div className="flex items-center justify-center">
          <input
            type="number"
            value={amount}
            step={0.01}
            onChange={(e) => {
              setAmount(Math.min(Number(e.target.valueAsNumber.toFixed(2)),Number(currentUser.balance ? currentUser.balance.toFixed(2) : 0.01)));
            }}
            placeholder="1234"
            className="border-current border-2 rounded-2xl text-lg p-4 "
            min="0.01"
          ></input>
        </div>
        <div className="py-5 flex items-center justify-center">
          <button
            type="button"
            className={
              "enabled:hover:bg-bg-red-600 bg-clip-border px-8 py-5 text-lg 2xl:text-2xl text-white rounded-3xl bg-red-500 disabled:opacity-25 transition-colors"
            }
            onClick={withdrawn_handle}
            disabled={(amount && !noAccount && (Number(amount) > 0)) ? false:true}
          >
            {" "}
            💸 Confirm Withdrawn
          </button>
        </div>
        {noAccount && (<p className="text-center text-base text-red-700">
          Account information should be provided before withdrawing
        </p>)}
        {amount ? false:true && (
          <p className="text-center text-base text-red-700">
            Withdraw amount should be more than 0 and at most 2 decimal places
          </p>
        )}

        {noAccount && (
          <p className="text-center text-lg text-red-700">
            You need bank account to withdrawn
          </p>
        )}
      </div>
    </div>
  );
}
export default WithDrawnPage;
