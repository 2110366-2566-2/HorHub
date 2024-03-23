import React, { useEffect, useState } from "react";
import Tab from "../../components/Tab/Tab";
import { useUser } from "../../lib/context/UserContext";
import LoadingPage from "../etc/LoadingPage";
import NotFoundPage from "../etc/NotFoundPage";
import { BookingType } from "../../lib/type/Booking";
import BookingCard from "../../components/Booking/BookingCard";
import useAuthRedirect from "../../lib/authRedirect";
import { IoWarningOutline } from "react-icons/io5";

const BookingListPage = () => {
  const { currentUser, isLoading } = useUser();

  const [isFetching, setFetching] = useState<boolean>(true);
  const [isInvalid, setInvalid] = useState<boolean>(false);

  const [bookingsData, setBookingsData] = useState<BookingType[]>([]);
  const [tabState, setTabState] = useState<string>("current");

  const tabOptions = [
    {
      name: "Current Reservations",
      onClick: () => setTabState("current"),
      isActive: tabState == "current",
    },
    {
      name: "Past Reservations",
      onClick: () => setTabState("past"),
      isActive: tabState == "past",
    },
  ];

  async function initData() {
    if (!currentUser) {
      return;
    }
    setFetching(true);

    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "/users/" +
          currentUser.id +
          "/bookings",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!res.ok) {
        setInvalid(true);
        setFetching(false);
      }

      const data = await res.json();

      setBookingsData(data);
      setFetching(false);
    } catch (err) {
      setInvalid(true);
      setFetching(false);
    }
  }

  useAuthRedirect();

  useEffect(() => {
    window.document.title = "My Reservation | HorHub";
    initData();
  }, [isLoading]);

  if (isLoading || isFetching) {
    return <LoadingPage />;
  }

  if (!currentUser || currentUser.role != "Customer") {
    return <NotFoundPage />;
  }

  return (
    <div className="page">
      <div className="w-full flex flex-col gap-3">
        <div className="text-xl font-bold">My Reservation</div>
        <Tab options={tabOptions} />
      </div>
      <div className="w-full flex flex-col py-6 items-center gap-3">
        {
          (tabState === "current") && <div className="card w-full md:w-3/4 shadow-lg border border-indigo-600 bg-indigo-100 text-indigo-600">
            <div className="card-body py-4 flex flex-row items-center gap-2">
              <IoWarningOutline className="w-5 h-5" />
              <div className="text-sm font-bold">Please make a payment before starting date or your reservation <span className="text-red-700">will be cancelled</span> automatically!</div>
            </div>
          </div>
        }
        {bookingsData
          .filter((value) => {
            if (tabState === "current") {
              return ["Pending", "PaymentPending", "Confirmed"].includes(value.status);
            } else if (tabState === "past") {
              return ["Completed", "Cancelled"].includes(value.status);
            }
          })
          .map((value, idx) => {
            return <BookingCard key={value.id} data={value} />;
          })}
      </div>
    </div>
  );
};

export default BookingListPage;
