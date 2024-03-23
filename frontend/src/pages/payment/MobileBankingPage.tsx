import { Link } from "react-router-dom"
import { LuSmartphone } from "react-icons/lu";
import React from 'react'
import Select, { StylesConfig } from 'react-select';
import { FaPlus } from "react-icons/fa";
import { LuQrCode } from "react-icons/lu";

const options = [
    { value: 'BANK_1', label: 'BANK_1' },
    { value: 'BANK_2', label: 'BANK_2' },
    { value: 'BANK_3', label: 'BANK_3' }
  ]

function MobileBankingPage() {

    return(
        <div className="page">
            <div className="flex flex-row mt-20 mb-20 gap-20 w-[90%] h-[90%] justify-center">
                <div className="flex flex-col min-w-[50%] max-w-[75%] h-1/2">
                    <div className="flex flex-col rounded-2xl bg-indigo-100 w-full gap-2 h-[30rem]">
                        <div className="flex flex-col h-[10rem]">
                            <div className="flex p-8 text-4xl font-bold justify-start">Mobile Banking Payment</div>
                            <div className="flex ms-6 me-6 border-t border-1 border-gray-400 flex-grow"></div>   
                        </div>
                        <div className="flex flex-col h-[10rem]">
                            <LuSmartphone className="flex ms-[45%] mt-6 text-8xl text-black" />
                            <div className="flex ms-8 mb-4 text-2xl"></div>
                        </div>
                        <div className="flex flex-col h-[10rem]">
                            <div className="flex ms-8 mt-6 text-3xl font-bold text-indigo-600"></div>
                            <div className="flex ms-8 mb-4 text-2xl"></div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col min-w-[25%] max-w-[50%] items-center gap-2">
                    <div className="flex flex-row w-[100%] gap-4 justify-between items-center">
                        <Select 
                            options={options}
                            placeholder={"Select Card"} 
                            className="w-[80%]"
                        />
                        <button className="flex justify-center items-center rounded-md bg-indigo-500 w-[2.25rem] h-[2.25rem]">
                            <FaPlus className="text-slate-50"/>
                        </button>
                    </div>
                    <div className="flex mt-[4rem] items-center text-3xl text-indigo-600 font-bold">Total Price</div>
                    <div className="flex mt-[2rem] items-end flex-col">
                        <div className="flex justify-center text-4xl font-bold">฿15,000.00</div>
                        <div className="flex justify-center text-xl">Including Vat 7%</div>
                    </div> 
                    <button className="flex mt-[2rem] rounded-xl items-center text-xl bg-gray-300 text-white font-bold p-4">Proceed</button>
                    <div className="flex mt-[2rem] justify-center text-xl">Or pay via QR code here</div>
                    <Link
                        to="/payment/mobileBanking/QRcode"
                        className="flex items-center justify-center rounded-2xl w-[70%] mt-4 hover:bg-indigo-600 bg-indigo-500 text-white text-2xl p-4 font-bold"
                    >
                        <LuQrCode className="me-2"/> QR - Payment
                    </Link> 
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