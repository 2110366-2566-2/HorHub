import { LuSmartphone } from "react-icons/lu";
import { LuCreditCard } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";


function PaymentPage2() {

    const location = useLocation();
    const navigate = useNavigate();

    const data = location.state.value;

    const handleSelectMethod = () => {
        navigate(`${method}`,{state:{price:data.price.toFixed(2)}});
    }

    const countDurationInDays = (startDate:Date, endDate:Date) => {
        // Convert both dates to milliseconds
        const startMilliseconds = startDate.getTime();
        const endMilliseconds = endDate.getTime();
    
        // Calculate the difference in milliseconds
        const durationMilliseconds = Math.abs(endMilliseconds - startMilliseconds);
    
        // Convert milliseconds to days
        const days = Math.ceil(durationMilliseconds / (1000 * 60 * 60 * 24));
    
        return days + 1;
    }
    const reformat = (date:String) => {
        const [dayOfWeek, month, day, year] = date.split(' ');
        return `${month} ${day} ${year} (${dayOfWeek})`;
    };
    const startDate = reformat(new Date(data.startAt.toString()).toDateString());
    const endDate = reformat(new Date(data.endAt.toString()).toDateString());
    const duration = countDurationInDays(new Date(data.startAt), new Date(data.endAt));

    const [method, setMethod] = useState<'creditCard' | 'mobileBanking'>('creditCard');

    const handlePaymentSelection = (method: 'creditCard' | 'mobileBanking') => {
        setMethod(method);
      };

    useEffect(() => {
    window.document.title = "Payment | HorHub";
    }, []);

    return (
        <div className="page">
            <div className="flex flex-row mt-20 mb-20 gap-20 w-[90%] h-[90%] justify-center">
                <div className="flex flex-col min-w-[50%] max-w-[75%]">
                    <div className="flex flex-col rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600">
                        <div className="flex flex-col rounded-2xl bg-indigo-100 w-full gap-2">
                            <div className="flex flex-col">
                                <div className="flex ms-8 mt-8 text-4xl font-bold">Payment Summary</div>
                                <div className="flex ms-6 me-6 mt-6 border-t border-1 border-gray-400 flex-grow"></div>   
                            </div>
                            <div className="flex flex-col">
                                <div className="flex ms-8 mt-6 text-3xl font-bold text-indigo-600">Dorm Information</div>
                                <div className="flex ms-8 mb-4 text-2xl">{data.roomType.dorm.name}</div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex ms-8 mt-6 text-3xl font-bold text-indigo-600">Dorm Room</div>
                                <div className="flex ms-8 mb-4 text-2xl">{data.roomType.name}</div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-center gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <div className="ms-8 mt-4 text-3xl text-slate-50 font-bold">Capacity</div>
                                <div className="ms-8 mb-4 text-2xl text-slate-50">{data.roomType.capacity}</div>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="mt-4 text-3xl text-slate-50 font-bold">Start Date</div>
                                <div className="mb-4 text-2xl text-slate-50">{startDate}</div>
                            </div>                    
                            <div className="flex flex-col items-center gap-2">
                                <div className="me-8 mt-4 text-3xl text-slate-50 font-bold">End Date</div>
                                <div className="me-8 mb-4 text-2xl text-slate-50">{endDate}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-between gap-2 mt-4">
                        <div className="flex items-center text-3xl text-indigo-600 font-bold">Total Date</div>
                        <div className="flex items-center text-4xl font-bold">{duration}</div>
                        <div className="flex items-center text-3xl text-indigo-600 font-bold">Total Price</div>
                        <div className="flex items-start flex-col">
                            <div className="flex justify-center text-4xl font-bold">฿{data.price.toFixed(2)}</div>
                            <div className="flex justify-center text-xl">Including Vat 7%</div>
                        </div>  
                    </div> 
                </div>
                <div className="flex flex-col min-w-[25%] max-w-[50%] items-center gap-2">
                    <div className="">
                        <div className="text-3xl font-bold">Payment Method</div>
                    </div>
                    <button className={`flex flex-col items-center justify-center rounded-2xl border ${method === 'creditCard' ? 'border-indigo-500 bg-indigo-100' : 'border-gray-400 hover:bg-slate-100'} w-[100%] h-[40%] mt-4`} onClick={() => handlePaymentSelection('creditCard')}>
                        <LuCreditCard className="text-6xl" />
                        <div className="text-2xl font-bold">Credit / Debit Card</div>
                    </button>
                    <button className={`flex flex-col items-center justify-center rounded-2xl border ${method === 'mobileBanking' ? 'border-indigo-500 bg-indigo-100' : 'border-gray-400 hover:bg-slate-100'} w-[100%] h-[40%] mt-4`} onClick={() => handlePaymentSelection('mobileBanking')}>
                        <LuSmartphone className="text-6xl" />
                        <div className="text-2xl font-bold">Mobile Banking</div>    
                    </button>
                    <button 
                        type="submit"
                        // onClick={handleSelectMethod}
                        className="flex items-center justify-center rounded-2xl w-[70%] h-[10%] mt-4 hover:bg-indigo-600 bg-indigo-500"
                    >
                        <div className="text-3xl text-slate-50 font-bold">Next</div>
                    </button>
                </div>
            </div>  
            <div className="flex items-start justify-start ms-8 w-full">
                <Link 
                    to="/bookings"
                    className="text-4xl text-black hover:text-indigo-600"
                >
                    &lt; Back
                </Link>
            </div>
        </div>
    );
}

export default PaymentPage2



