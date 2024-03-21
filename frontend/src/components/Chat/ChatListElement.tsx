import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { Chat } from '../../lib/type/Chat'
import { useUser } from '../../lib/context/UserContext'

const ChatListElement = ({ chat }: { chat: Chat }) => {

  const {currentUser, isLoading} = useUser()

  if (!currentUser) {
    return <></>
  }

  return (
    <Link to={"/chats/" + chat.id} className="w-full h-16 flex flex-col items-center justify-center hover:bg-indigo-100 transition-colors text-xs text-black"> 
        <div className="w-full px-5 flex gap-3">
            <Avatar src={(currentUser.id === chat.participantA.id) ? chat.participantB.imageURL : chat.participantA.imageURL} />
            <div className="h-full w-full flex flex-col gap-1 justify-center">
                <div className="font-bold text-sm">{(currentUser.id === chat.participantA.id) ? chat.participantB.displayName : chat.participantA.displayName}</div>
                <div className="">You: Hello Ajarn</div>
            </div>
        </div>
    </Link>
  )
}

export default ChatListElement