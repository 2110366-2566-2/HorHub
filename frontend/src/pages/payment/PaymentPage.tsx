{/*<Route path="Payment" element={<PaymentPage />} />*/}

function PaymentPage() {

  return (
    <div className="page">
        <div className="flex flex-row mt-8">
            <div className="flex flex-col rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 min-w-[75%] max-w-[100%]">
                <div className="flex flex-col rounded-2xl bg-indigo-100 w-full gap-2">
                    <div className="flex ms-8 mt-4 text-4xl">Payment Summary</div>
                    <div className="flex ms-6 me-6 mt-2 border-t border-1 border-gray-400 flex-grow"></div>
                    <div className="flex ms-8 mt-4 text-2xl font-bold text-indigo-600">Dorm Information</div>
                    <div className="flex ms-8 text-3xl">Khao San Social Capsule Hostel</div>
                    <div className="flex ms-8 mt-4 text-2xl font-bold text-indigo-600">Dorm Room</div>
                    <div className="flex ms-8 mb-4 text-3xl">Very Small Room</div>
                </div>
                <div className="flex flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <div className="ms-8 mt-4 text-2xl text-slate-50 font-bold">Capacity</div>
                        <div className="ms-8 mb-4 text-3xl text-slate-50">2</div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="mt-4 text-2xl text-slate-50 font-bold">Start Date</div>
                        <div className="mb-4 text-3xl text-slate-50">Mar 14 2024 (Thu)</div>
                    </div>                    
                    <div className="flex flex-col items-center gap-2">
                        <div className="me-8 mt-4 text-2xl text-slate-50 font-bold">End Date</div>
                        <div className="me-8 mb-4 text-3xl text-slate-50">Mar 16 2024 (Sat)</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col max-w-[25%]">
                <div className="">
                    <div className="p-4">Payment Method</div>
                </div>
                <div className="">
                    <div className="p-4">Credit / Debit Card</div>
                </div>
                <div className="">
                    <div className="p-4">Mobile Banking</div>    
                </div>
            </div>
        </div>
    </div>
    );
}

export default PaymentPage