import React, { useState } from 'react'
import { FaImage } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosSend } from 'react-icons/io'

const ChatMessageSendBox = () => {

  const [text, setText] = useState<string>("")
  
  function submitText(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    alert(text)
  }

  return (
    <div className="w-full h-16 flex items-center bg-indigo-100 gap-4 px-5">
        <button><FaLocationDot className="text-xl fond-bold text-indigo-600" /></button>
        <button><FaImage className="text-xl fond-bold text-indigo-600" /></button>
        <form className="flex items-center w-full gap-4" onSubmit={submitText}>
          <input 
            type="text" 
            className="block w-full p-2 ps-5 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Aa"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit"><IoIosSend className="text-xl fond-bold text-indigo-600" /></button>
        </form>
    </div>
  )
}

export default ChatMessageSendBox