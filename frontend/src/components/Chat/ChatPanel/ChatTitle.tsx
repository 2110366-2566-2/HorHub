import { Avatar } from '@mui/material'
import React from 'react'
import { Chat } from '../../../lib/type/Chat'
import { useUser } from '../../../lib/context/UserContext'
import ChatToggleNotificationButton from './ChatToggleNotificationButton'

const ChatTitle = ({ chat }: { chat: Chat | undefined }) => {

  const { currentUser, isLoading } = useUser()


  if (!chat || !currentUser) {
    return <div className="w-full h-14 flex px-5 items-center bg-indigo-100">
      <div className="flex items-center gap-2">
          <Avatar sx={{ width: 36, height: 36 }} />
          <div className="font-bold text-sm"></div>
      </div>
    </div>
  }

  return (
    <div className="w-full h-14 flex px-5 items-center bg-indigo-100">
        <div className="flex items-center w-full gap-2">
            <Avatar sx={{ width: 36, height: 36 }} src={(currentUser.id === chat.participantA.id) ? chat.participantB.imageURL : chat.participantA.imageURL} />
            <div className="font-bold text-sm">{(currentUser.id === chat.participantA.id) ? chat.participantB.displayName : chat.participantA.displayName}</div>
            <div className="grow flex justify-end">
              <ChatToggleNotificationButton chatId={chat.id} />
            </div>
            
        </div>
    </div>
  )
}

export default ChatTitle