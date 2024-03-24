import { useParams } from "react-router-dom";
import useAuthRedirect from "../../lib/authRedirect";
import { useEffect, useState } from "react";
import NotFoundPage from "../etc/NotFoundPage";
import LoadingPage from "../etc/LoadingPage";
import { z } from "zod";





const bookingSchema = z.object({
  id: z.string(),
  roomType: z.object({
    capacity: z.number(),
    name: z.string(),
    numberOfAvailableRoom: z.number(),
    numberOfRoom: z.number(),
    dorm: z.object({
      name: z.string(),
    }),
  }),
  customerId: z.string(),
  price: z.number(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  bookAt: z.coerce.date(),
  status: z.enum(["Pending", "PaymentPending", "Confirmed", "Completed", "Cancelled"]),
});

type Book = z.infer<typeof bookingSchema>;

export default function PaymentPage() {
  const { bookingId } = useParams();
  const [isNotFound, setNotFound] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [bookData, setBookData] = useState<Book | null>(null);

  useAuthRedirect();
  useEffect(() => {
    const initData = async () => {
      const result = await fetch(
        process.env.REACT_APP_BACKEND_URL +
          `/users/${bookingId}/payment/bookings/`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (result.ok) {
        const tmp = await result.json();
        console.log(tmp);
        const my_data = bookingSchema.safeParse(tmp);
        if (!my_data.success) {
          console.log("Unsafe Parse")
          setNotFound(true);
        } else {
          setBookData(my_data.data);
          setNotFound(false);
        }
      } else {
        setNotFound(true);
      }

      setLoading(false);
    };
    initData();
  }, []);
  if (isLoading) return <LoadingPage />;
  if (isNotFound || !bookData) return <NotFoundPage />;
  const diffTime = bookData.endAt.getTime() - bookData.startAt.getTime();
  const total_days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="page-row items-center text-xl">
      <div className="w-full gap-y-4 h-full flex flex-col">
        <div className="min-h-[75%] bg-gradient-to-r from-cyan-400 to-sky-700 rounded-lg">
          <div className="bg-indigo-300 rounded-lg flex flex-col gap-y-4 p-4">
            <div className="text-2xl font-bold">Payment Summary</div>
            <div className="border-b-2 border-black w-4/5 self-center"></div>
            <div className="flex flex-col">
              <div className="bg-gradient-to-r text-left from-sky-600 to-indigo-700 h-full items-center bg-clip-text text-transparent font-bold text-lg">
                Dorm Information
              </div>
              <div>{bookData.roomType.dorm.name}</div>
            </div>
            <div className="flex flex-col">
              <div className="bg-gradient-to-r text-left from-sky-600 to-indigo-700 h-full items-center bg-clip-text text-transparent font-bold text-lg">
                Dorm Room
              </div>
              <div>{bookData.roomType.name}</div>
            </div>
          </div>
          <div className="flex flex-row text-center text-white">
            <div className="w-full ">
              <div className="font-bold">Capacity</div>
              <div>{bookData.roomType.capacity}</div>
            </div>
            <div className="w-full">
              <div className="font-bold">Start Date</div>
              <div>{bookData.startAt.toDateString()}</div>
            </div>
            <div className="w-full">
              <div className="font-bold">End Date</div>
              <div>{bookData.endAt.toDateString()}</div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-x-4 justify-center items-center">
            <div className="bg-gradient-to-r text-left w-full from-sky-600 to-indigo-700 h-full items-center bg-clip-text text-transparent font-bold text-lg">
              Total Date
            </div>
            <div className="w-full">{total_days}</div>
            <div className="bg-gradient-to-r text-left w-full from-sky-600 to-indigo-700 h-full items-center bg-clip-text text-transparent font-bold text-lg">
              Total Price
            </div>
            <div className="w-full">{bookData.price}</div>
          </div>
        </div>
      </div>
      <div className="w-full">KK</div>
    </div>
  );
}
