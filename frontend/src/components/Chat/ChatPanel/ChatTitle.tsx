import { Avatar } from '@mui/material'
import React from 'react'

const ChatTitle = () => {
  return (
    <div className="w-full h-14 flex px-5 items-center bg-indigo-100">
        <div className="flex items-center gap-2">
            <Avatar sx={{ width: 36, height: 36 }} src={"https://static.wixstatic.com/media/665921_098e318fa36b4c958e3e73212e6c983d~mv2.jpg/v1/fill/w_800,h_1000,al_c,q_85/BMEWEB_FACULTY-1.jpg"} />
            <div className="font-bold text-sm">Duang*** Wicha*****</div>
        </div>
        
    </div>
  )
}

export default ChatTitle