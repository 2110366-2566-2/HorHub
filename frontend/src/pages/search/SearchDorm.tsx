import { IoIosSearch } from "react-icons/io"
import { IoSearch } from "react-icons/io5";
import DormList from "./DormList";
import { IoLocationOutline } from "react-icons/io5";
import React from 'react';
import Select from 'react-select';
import { availableDormFacilities } from "../../lib/constants/dormFacilities";
import { MdOutlineMonetizationOn } from "react-icons/md";

function SearchDorm(){


    return (
        <div className="relative w-full min-h-[calc(100vh-7rem)] flex flex-col items-center">
            <div className="w-full flex flex-col bg-indigo-100 z-10">
                <ul className="flex gap-8 items-center w-[70%] h-full px-8 py-4">
                    <li><IoIosSearch className="text-4xl text-indigo-600"/></li>
                    <li><text className="text-2xl text-indigo-600 font-bold">Search Dorm</text></li>
                </ul>
                <ul className="flex gap-8 items-center h-full px-8 py-4">
                    <form className="w-[90%] mx-auto space-y-4">
                        <div className="relative flex flex-row justify-between">   
                            <div className="relative flex flex-col w-[49%]">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <IoSearch className="text-2xl fond-bold text-indigo-600"/>
                                </div>    
                                <input type="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Dorm Name..." required />
                            </div>
                            <div className="relative flex flex-col w-[49%]">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <IoLocationOutline className="text-2xl fond-bold text-indigo-600"/>
                                </div>    
                                <input type="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Dorm Location ..." required />
                            </div>
                        </div>
                        <div className="relative flex flex-row justify-between">   
                            <div className="relative flex flex-col w-[67%]">
                                <Select
                                    isMulti
                                    name="facilities"
                                    options={availableDormFacilities}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder={<div>Select Facilities</div>}
                                />    
                            </div>
                        </div>
                        <div className="relative flex flex-row justify-start items-center gap-2"> 
                            <div className="relative flex flex-col w-[12.5%]">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pe-1 pointer-events-none border-r-4 border-indigo-100">
                                    <text className="text-lg font-bold text-indigo-800">Min</text> <MdOutlineMonetizationOn className="text-2xl text-indigo-600"/>
                                </div>    
                                <input type="search" className="block w-full p-4 ps-[40%] text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50" placeholder="Min Price ..." required />
                            </div>
                            <div className="relative flex flex-col w-[12.5%]">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pe-1 pointer-events-none border-r-4 border-indigo-100">
                                    <text className="text-lg font-bold text-indigo-800">Max</text> <MdOutlineMonetizationOn className="text-2xl text-indigo-600"/>
                                </div>    
                                <input type="search" className="block w-full p-4 ps-[40%] text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50" placeholder="Max Price ..." required />
                            </div>
                        </div>
                        <div className="relative flex flex-row gap-4">
                            <div className="flex items-center gap-2">
                                <text className="text-xl font-bold text-indigo-800">Price</text>
                                <select name="price">
                                    <option value="ASC">Low to High</option>
                                    <option value="DESC">High to Low</option>
                                </select>     
                            </div>
                            <div className="flex items-center gap-2">
                            <text className="text-xl font-bold text-indigo-800">Distance</text>
                                <select name="distance">
                                    <option value="ASC">ใกล้คุณ</option>
                                    <option value="DESC">ไกลคุณ</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </ul>
            </div> 
            {<DormList />}
        </div>
    )
}

export default SearchDorm