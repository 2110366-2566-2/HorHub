import { IoIosSearch } from "react-icons/io"
import { IoSearch } from "react-icons/io5";
import DormList from "./DormList";
import { IoLocationOutline } from "react-icons/io5";
import React from 'react';
import Select, { MultiValue } from 'react-select';
import { availableDormFacilities } from "../../lib/constants/dormFacilities";
import { MdOutlineMonetizationOn } from "react-icons/md";

type SearchProps = {
    name: string,
    location: string,
    dormFacilities: string[],
    minPrice: number,
    maxPrice: number,
    sorter: string,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setLocation: React.Dispatch<React.SetStateAction<string>>,
    setDormFacilities: React.Dispatch<React.SetStateAction<string[]>>,
    setMinPrice: React.Dispatch<React.SetStateAction<number>>,
    setMaxPrice: React.Dispatch<React.SetStateAction<number>>,
    setSorter: React.Dispatch<React.SetStateAction<string>>
}

function SearchDorm({
    name, location, dormFacilities, minPrice, maxPrice, sorter, setName, setLocation, setDormFacilities, setMinPrice, setMaxPrice, setSorter
}: SearchProps){

    return (
        <div className="relative w-full flex flex-col items-center">
            <div className="w-full flex flex-col bg-indigo-100 z-10">
                <ul className="flex gap-8 items-center w-[70%] h-full px-8 py-4">
                    <li><IoIosSearch className="text-2xl text-indigo-600"/></li>
                    <li><text className="text-xl text-indigo-600 font-bold">Search Dorm</text></li>
                </ul>
                <ul className="flex gap-8 items-center h-full px-8 py-4">
                    <form className="w-[90%] mx-auto space-y-4">
                        <div className=" flex flex-row justify-between">   
                            <div className="relative flex flex-col w-[49%]">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <IoSearch className="text-xl fond-bold text-indigo-600"/>
                                </div>    
                                <input 
                                    type="text" 
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                                    placeholder="Search Dorm Name..."
                                    value={name}
                                    onChange={(e) => {setName(e.target.value)}}
                                 />
                            </div>
                            <div className="relative flex flex-col w-[49%]">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <IoLocationOutline className="text-xl fond-bold text-indigo-600"/>
                                </div>    
                                <input 
                                    type="text" 
                                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                                    placeholder="Dorm Location ..." 
                                    value={location}
                                    onChange={(e) => {setLocation(e.target.value)}}
                                />
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
                                    placeholder={<div className="text-sm">Select Facilities</div>}
                                    value={availableDormFacilities.filter((fac) => dormFacilities.includes(fac.value))}
                                    onChange={(e) => {setDormFacilities(availableDormFacilities.filter((fac) => e.includes(fac)).map((fac) => fac.value))}}
                                />    
                            </div>
                        </div>
                        <div className="relative flex flex-row justify-start items-center"> 
                            <div className="relative flex flex-col w-[15%]">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pe-1 pointer-events-none border-indigo-100">
                                    <MdOutlineMonetizationOn className="text-xl font-bold text-indigo-600"/>
                                </div>    
                                <input 
                                    type="number" 
                                    className="block w-full p-2 ps-[40%] text-sm text-gray-900 border border-gray-300 rounded-l-2xl bg-gray-50" 
                                    placeholder="Min Price ..."
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(Number(Math.max(Number(e.target.value), 0)))}    
                                />
                            </div>
                            <div className="relative flex flex-col w-[15%]">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-2 pe-1 pointer-events-none border-indigo-100">
                                    <text className="text-sm font-bold text-indigo-800">to</text>
                                </div>    
                                <input 
                                    type="number" 
                                    className="block w-full p-2 ps-[40%] text-sm text-gray-900 border border-gray-300 rounded-r-2xl bg-gray-50" 
                                    placeholder="Max Price ..." 
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(Math.min(Number(e.target.value), 9999999)))}
                                />
                            </div>
                        </div>
                        <div className="relative flex flex-row gap-4 items-center">
                            <text className="text-sm font-bold text-indigo-800">Sort by</text>
                            <div className="join">
                                <button type="button" className={"join-item " + ((sorter === "cheapest") ? "indigo-button-xs" : "white-button-xs")} onClick={() => setSorter("cheapest")}>Cheapest</button>
                                {/* <button type="button" className={"join-item " + ((sorter === "mostexpensive") ? "indigo-button-xs" : "white-button-xs")} onClick={() => setSorter("mostexpensive")}>Most Expensive</button> */}
                                <button type="button" className={"join-item " + ((sorter === "nearest") ? "indigo-button-xs" : "white-button-xs")} onClick={() => setSorter("nearest")}>Nearest</button>
                            </div>
                        </div>
                    </form>
                </ul>
            </div> 
        </div>
    )
}

export default SearchDorm