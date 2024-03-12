import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "../../../etc/NotFoundPage";
import LoadingPage from "../../../etc/LoadingPage";
import {
  BookingProviderType,
  BookingsSchema,
} from "../../../../lib/type/Booking";
import ProviderBookCard from "../../../../components/Provider/ProviderBookCard";

export default function BookPage() {
  const { id, roomId } = useParams();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isNotFound, setNotFound] = useState<boolean>(false);
  const [bookingData, setBookingData] = useState<BookingProviderType[] | null>(
    null
  );
  useEffect(() => {
    async function fetchData() {
      const result = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "/dorms/" +
          id +
          "/roomtypes/" +
          roomId +
          "/booking",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (result.ok) {
        console.log(result);
        const data = BookingsSchema.safeParse(await result.json());
        if (!data.success) {
          console.log(data.error);
          setLoading(false);
          setNotFound(true);
          return;
        }
        setBookingData(data.data);
        setLoading(false);
        setNotFound(false);
        console.log(data.data);
        //console.log(data.data);
      } else {
        setLoading(false);
        setNotFound(true);
      }
    }
    fetchData();
  }, [roomId]);
  if (isLoading) return <LoadingPage />;
  if (isNotFound) return <NotFoundPage />;
  return (
    <>
      {bookingData &&
        bookingData.map((book) => {
          return <ProviderBookCard key={book.id} data={book} />;
        })}
    </>
  );
}
