import { Link } from "react-router-dom"

function MobileBankingPage() {

    return(
        <div className="page">
            <div className="flex flex-row mt-20 mb-20 gap-20 w-[90%] h-[90%] justify-center">
                <div className="flex flex-col min-w-[50%] max-w-[75%] h-1/2">
                    <div className="flex flex-col rounded-2xl bg-indigo-100 w-full gap-2 h-[24rem]">
                        <div className="flex flex-col h-[8rem]">
                            <div className="flex p-8 text-4xl font-bold justify-start">Mobile Banking Payment</div>
                            <div className="flex ms-6 me-6 border-t border-1 border-gray-400 flex-grow"></div>   
                        </div>
                        <div className="flex flex-col h-[8rem]">
                            <div className="flex ms-[4rem] mt-6 text-6xl font-bold text-indigo-600"></div>
                            <div className="flex ms-8 mb-4 text-2xl"></div>
                        </div>
                        <div className="flex flex-col h-[8rem]">
                            <div className="flex ms-8 mt-6 text-3xl font-bold text-indigo-600"></div>
                            <div className="flex ms-8 mb-4 text-2xl"></div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col min-w-[25%] max-w-[50%] items-center gap-2">
                    <div className="">
                        <div className="text-3xl font-bold">Payment Method</div>
                    </div>
                </div>
            </div>  
            <div className="flex items-start justify-start ms-8 w-full">
                <Link 
                    to="/payment"
                    className="text-4xl text-black hover:text-indigo-600"
                >
                    &lt; Back
                </Link>
            </div>
        </div>
    )
}

export default MobileBankingPage