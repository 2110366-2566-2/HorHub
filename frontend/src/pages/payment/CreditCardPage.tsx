import { Link } from "react-router-dom"
import { LuMemoryStick } from "react-icons/lu";
import React from 'react'
import Select, { StylesConfig } from 'react-select';
import { FaPlus } from "react-icons/fa";

const options = [
  { value: 'CARD_1', label: 'CARD_1' },
  { value: 'CARD_2', label: 'CARD_2' },
  { value: 'CARD_3', label: 'CARD_3' }
]

function CreditCardPage() {

    return(
        <div className="page">
            <div className="flex flex-row mt-20 mb-20 gap-20 w-[90%] h-[90%] justify-center">
                <div className="flex flex-col min-w-[50%] max-w-[75%] h-1/2">
                    <div className="flex flex-col rounded-2xl bg-indigo-100 w-full gap-2 h-[24rem]">
                        <div className="flex flex-col h-[8rem]">
                            <div className="flex p-8 text-4xl font-bold justify-start">Credit / Debit Card Payment</div>
                            <div className="flex ms-6 me-6 border-t border-1 border-gray-400 flex-grow"></div>   
                        </div>
                        <div className="flex flex-col h-[8rem]">
                            <LuMemoryStick className="flex ms-[4rem] mt-6 text-6xl font-bold text-indigo-600" />
                            <div className="flex ms-8 mb-4 text-2xl"></div>
                        </div>
                        <div className="flex flex-col h-[8rem]">
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
                        <div className="flex items-center text-3xl text-indigo-600 font-bold">Total Price</div>
                        <div className="flex items-start flex-col">
                            <div className="flex justify-center text-4xl font-bold">฿15,000.00</div>
                            <div className="flex justify-center text-xl">Including Vat 7%</div>
                        </div> 
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

export default CreditCardPage