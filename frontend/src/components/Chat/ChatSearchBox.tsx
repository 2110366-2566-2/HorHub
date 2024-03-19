import React from 'react'
import { IoSearch } from 'react-icons/io5'

const ChatSearchBox = ({value, onChange}: {value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
  return (
    <div className="w-full h-16 bg-indigo-100 flex items-center justify-center px-5 py-2">
        <div className="relative flex flex-col w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <IoSearch className="text-xl fond-bold text-indigo-600"/>
            </div>    
            <input 
                type="text" 
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Search Name..."
                value={value}
                onChange={onChange}
             />
        </div>
    </div>
  )
}

export default ChatSearchBox