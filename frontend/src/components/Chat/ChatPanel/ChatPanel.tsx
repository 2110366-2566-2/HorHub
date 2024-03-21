import React from 'react'
import ChatTitle from './ChatTitle'
import ChatMessageSendBox from './ChatMessageSendBox'
import ChatMessagePane from './ChatMessagePane'

const ChatPanel = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
        <ChatTitle />
        <ChatMessagePane />
        <ChatMessageSendBox />
    </div>
  )
}

export default ChatPanel