import { Link, useParams } from "react-router-dom";
import useAuthRedirect from "../../lib/authRedirect";
import { useEffect, useState } from "react";
import NotFoundPage from "../etc/NotFoundPage";
import LoadingPage from "../etc/LoadingPage";
import { z } from "zod";
import { LuCreditCard, LuSmartphone } from "react-icons/lu";
import { BsQrCode } from "react-icons/bs";
import CardPromptPayPayment from "../../components/Payment/CardPromptPayPayment";
import BankingPayment from "../../components/Payment/BankingPayment";



const bookingSchema = z.object({
  id: z.string(),
  roomType: z.object({
    capacity: z.number(),
    name: z.string(),
    numberOfAvailableRoom: z.number(),
    numberOfRoom: z.number(),
    images: z.string().array(),
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
  checkoutToken: z.string()
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

  function checkoutMobileBanking() {
    if (!bookData) return
    window.location.href = `/bookings/${bookingId}/payment/success/${bookData.checkoutToken}`
  }


  if (isLoading) return <LoadingPage />;
  if (isNotFound || !bookData) return <NotFoundPage />;
  const diffTime = bookData.endAt.getTime() - bookData.startAt.getTime();
  const total_days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


  return (
    <div className="page">
        <div className="flex flex-row mt-20 mb-20 gap-20 w-[90%] h-[90%] justify-center">
            <div className="flex flex-col min-w-[50%] max-w-[75%]">
                <div className="flex flex-col rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600">
                    <div className="flex flex-col rounded-2xl bg-indigo-100 w-full gap-2 pb-5">
                        <div className="flex flex-col">
                            <div className="flex ms-8 mt-8 text-xl font-bold">Payment Summary</div>
                            <div className="flex ms-6 me-6 mt-6 border-t border-1 border-gray-400 flex-grow"></div>   
                        </div>
                        <div className="flex items-center gap-2 w-full px-3">
                          <div className="rounded-md overflow-hidden shadow-[0_2px_8px_rgba(15,23,42,0.08)] bg-slate-200 ">
                            <img
                            className='w-[150px] h-[150px] aspect-square object-cover' 
                            src = {(bookData.roomType.images.length === 0) ? "https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/placeholders%2F681px-Placeholder_view_vector.png?alt=media&token=bc0c7178-b94a-4bf0-957b-42a75f708a79" : bookData.roomType.images[0]}/>
                          </div>
                          <div className='mx-6 grow'>
                            <div className='w-full flex justify-between font-bold'>
                              <div>{bookData.roomType.dorm.name}</div>
                            </div>
                            <div>Room: {bookData.roomType.name}</div>
                            <div>Capacity: {bookData.roomType.capacity}</div>
                            <div className='text-indigo-500'>{new Date(bookData.startAt).toDateString()} - {new Date(bookData.endAt).toDateString()}</div>
                          </div>
                        </div>
                        
                        {/* <div className="flex flex-col">
                            <div className="flex ms-8 mt-6 text-xl font-bold text-indigo-600">Dorm Information</div>
                            <div className="flex ms-8 mb-4 text-lg">{bookData.roomType.dorm.name}</div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex ms-8 mt-6 text-xl font-bold text-indigo-600">Dorm Room</div>
                            <div className="flex ms-8 mb-4 text-lg">{bookData.roomType.name}</div>
                        </div> */}
                    </div>
                    <div className="flex flex-row justify-between items-center gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <div className="ms-8 mt-4 text-xl text-slate-50 font-bold">Capacity</div>
                            <div className="ms-8 mb-4 text-lg text-slate-50">{bookData.roomType.capacity}</div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="mt-4 text-xl text-slate-50 font-bold">Start Date</div>
                            <div className="mb-4 text-lg text-slate-50">{(new Date(bookData.startAt)).toDateString()}</div>
                        </div>                    
                        <div className="flex flex-col items-center gap-2">
                            <div className="me-8 mt-4 text-xl text-slate-50 font-bold">End Date</div>
                            <div className="me-8 mb-4 text-lg text-slate-50">{(new Date(bookData.endAt)).toDateString()}</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-between gap-2 mt-4">
                    <div className="flex items-center text-xl text-indigo-600 font-bold">Total Date</div>
                    <div className="flex items-center text-2xl font-bold">{total_days}</div>
                    <div className="flex items-center text-xl text-indigo-600 font-bold">Total Price</div>
                    <div className="flex items-start flex-col">
                        <div className="flex justify-center text-2xl font-bold">฿{bookData.price.toFixed(2)}</div>
                        <div className="flex justify-center text-base">Including Vat 7%</div>
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
                {
                  (paymentMethod === "mobilebanking") && <BankingPayment checkoutMobileBanking={checkoutMobileBanking} />
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
