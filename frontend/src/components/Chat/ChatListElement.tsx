import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Chat } from '../../lib/type/Chat'
import { useUser } from '../../lib/context/UserContext'

const ChatListElement = ({ chat, setChatRooms }: { chat: Chat, setChatRooms: React.Dispatch<React.SetStateAction<Chat[]>> }) => {

  const {currentUser, isLoading} = useUser()

  if (!currentUser) {
    return <></>
  }

  const anotherParticipantDisplayName = (currentUser.id === chat.participantA.id) ? chat.participantB.displayName : chat.participantA.displayName

  return (
    <Link to={"/chats/" + chat.id} className="w-full h-16 flex flex-col items-center justify-center hover:bg-indigo-100 transition-colors text-xs text-black"> 
        <div className="w-full px-5 flex gap-3">
            <Avatar src={(currentUser.id === chat.participantA.id) ? chat.participantB.imageURL : chat.participantA.imageURL} />
            <div className="h-full grow overflow-clip flex flex-col gap-1 justify-center">
                <div className="font-bold text-sm truncate">{anotherParticipantDisplayName}</div>
                {(chat.latestMessage) && (
                  (chat.latestMessage.type === "Text") ? <p className="truncate">{(currentUser.id === chat.latestMessage.senderId) ? "You" : anotherParticipantDisplayName}: {chat.latestMessage.text}</p>
                  : (chat.latestMessage.type === "Images") ? <div>{(currentUser.id === chat.latestMessage.senderId) ? "You" : anotherParticipantDisplayName} sent {chat.latestMessage.pictures?.length || 1} image{((chat.latestMessage.pictures?.length || 1) > 1) && "s"}</div>
                  : <div>{(currentUser.id === chat.latestMessage.senderId) ? "You" : anotherParticipantDisplayName} sent a location</div>
                )}
            </div>
            {
              (chat.latestMessage) && <div className="text-slate-600 text-xs">{(new Date(chat.latestMessage.sentAt)).toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"})}</div>
            }
        </div>
    </Link>
  )
}

export default ChatListElement