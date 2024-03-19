import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const ChatListElement = () => {
  return (
    <Link to="#" className="w-full h-16 flex flex-col items-center justify-center hover:bg-indigo-100 transition-colors text-xs text-black"> 
        <div className="w-full px-5 flex gap-3">
            <Avatar src={"https://static.wixstatic.com/media/665921_098e318fa36b4c958e3e73212e6c983d~mv2.jpg/v1/fill/w_800,h_1000,al_c,q_85/BMEWEB_FACULTY-1.jpg"} />
            <div className="h-full w-full flex flex-col gap-1 justify-center">
                <div className="font-bold text-sm">Duang*** Wicha*****</div>
                <div className="">You: Hello Ajarn</div>
            </div>
        </div>
    </Link>
  )
}

export default ChatListElement