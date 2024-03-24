import { Link, useParams } from "react-router-dom";
import useAuthRedirect from "../../lib/authRedirect";
import { useEffect, useState } from "react";
import NotFoundPage from "../etc/NotFoundPage";
import LoadingPage from "../etc/LoadingPage";
import { z } from "zod";
import { LuCreditCard, LuSmartphone } from "react-icons/lu";
import { BsQrCode } from "react-icons/bs";
import CardPromptPayPayment from "../../components/Payment/CardPromptPayPayment";



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

  const [paymentMethod, setPaymentMethod] = useState<string>("")

  const [bankingOptions, setBankingOptions] = useState<{bank: string, number: string}[]>([])

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
    <div className="page">
        <div className="flex flex-row mt-20 mb-20 gap-20 w-[90%] h-[90%] justify-center">
            <div className="flex flex-col min-w-[50%] max-w-[75%]">
                <div className="flex flex-col rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600">
                    <div className="flex flex-col rounded-2xl bg-indigo-100 w-full gap-2">
                        <div className="flex flex-col">
                            <div className="flex ms-8 mt-8 text-3xl font-bold">Payment Summary</div>
                            <div className="flex ms-6 me-6 mt-6 border-t border-1 border-gray-400 flex-grow"></div>   
                        </div>
                        <div className="flex flex-col">
                            <div className="flex ms-8 mt-6 text-2xl font-bold text-indigo-600">Dorm Information</div>
                            <div className="flex ms-8 mb-4 text-1xl">{bookData.roomType.dorm.name}</div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex ms-8 mt-6 text-2xl font-bold text-indigo-600">Dorm Room</div>
                            <div className="flex ms-8 mb-4 text-1xl">{bookData.roomType.name}</div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <div className="ms-8 mt-4 text-2xl text-slate-50 font-bold">Capacity</div>
                            <div className="ms-8 mb-4 text-1xl text-slate-50">{bookData.roomType.capacity}</div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="mt-4 text-2xl text-slate-50 font-bold">Start Date</div>
                            <div className="mb-4 text-1xl text-slate-50">{(new Date(bookData.startAt)).toDateString()}</div>
                        </div>                    
                        <div className="flex flex-col items-center gap-2">
                            <div className="me-8 mt-4 text-2xl text-slate-50 font-bold">End Date</div>
                            <div className="me-8 mb-4 text-1xl text-slate-50">{(new Date(bookData.endAt)).toDateString()}</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-2 mt-4">
                    <div className="flex items-center text-2xl text-indigo-600 font-bold">Total Date</div>
                    <div className="flex items-center text-3xl font-bold">{total_days}</div>
                    <div className="flex items-center text-2xl text-indigo-600 font-bold">Total Price</div>
                    <div className="flex items-start flex-col">
                        <div className="flex justify-center text-3xl font-bold">฿{bookData.price.toFixed(2)}</div>
                        <div className="flex justify-center text-lg">Including Vat 7%</div>
                    </div>  
                </div> 
            </div>
            <div className="flex flex-col min-w-[25%] max-w-[50%] items-center gap-3">
                <div className="">
                    <div className="text-xl font-bold text-center">Choose your payment method</div>
                </div>
                <button className={`flex flex-col items-center justify-center rounded-2xl gap-2 border h-24 w-48 ${paymentMethod === 'cardpromptpay' ? 'border-indigo-500 bg-indigo-100' : 'border-gray-400 hover:bg-slate-100'}` } onClick={() => setPaymentMethod("cardpromptpay")}>
                    <div className="flex gap-4">
                      <LuCreditCard className="text-3xl" />
                      <BsQrCode className="text-3xl" />
                    </div>
                    <div className="text-base font-bold">Card / PromptPay</div>
                </button>
                <button className={`flex flex-col items-center justify-center rounded-2xl gap-2 border h-24 w-48 ${paymentMethod === 'mobilebanking' ? 'border-indigo-500 bg-indigo-100' : 'border-gray-400 hover:bg-slate-100'}`} onClick={() => setPaymentMethod("mobilebanking")}>
                    <LuSmartphone className="text-3xl" />
                    <div className="text-base font-bold">Mobile Banking</div>    
                </button>
                {/* <button className={`flex flex-col items-center justify-center rounded-2xl border h-24 w-48 ${paymentMethod === 'promptpay' ? 'border-indigo-500 bg-indigo-100' : 'border-gray-400 hover:bg-slate-100'}`} onClick={() => setPaymentMethod("promptpay")}>
                    <BsQrCode className="text-4xl" />
                    <div className="text-1xl font-bold">PromptPay</div>    
                </button> */}
                {/* <button 
                    type="submit"
                    // onClick={handleSelectMethod}
                    className="flex items-center justify-center rounded-2xl w-[70%] h-[10%] mt-4 hover:bg-indigo-600 bg-indigo-500"
                >
                    <div className="text-2xl text-slate-50 font-bold">Next</div>
                </button> */}
                {
                  (paymentMethod === "cardpromptpay") && <CardPromptPayPayment />
                }
            </div>
        </div>  
        {/* <div className="flex items-start justify-start ms-8 w-full">
            <Link
                to="/bookings"
                className="text-4xl text-black hover:text-indigo-600"
            >
                &lt; Back
            </Link>
        </div> */}
        
    </div>
);
}
