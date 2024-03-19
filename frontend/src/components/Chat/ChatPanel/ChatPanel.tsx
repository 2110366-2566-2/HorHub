import React from 'react'
import ChatTitle from './ChatTitle'
import ChatMessageSendBox from './ChatMessageSendBox'

const ChatPanel = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
        <ChatTitle />
        <ChatMessageSendBox />
    </div>
  )
}

export default ChatPanel