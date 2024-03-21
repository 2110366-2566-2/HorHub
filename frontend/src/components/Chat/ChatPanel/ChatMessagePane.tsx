import React from 'react'
import ChatMessage from './ChatMessage/ChatMessage'

const ChatMessagePane = () => {
  return (
    <div className="w-full h-full overflow-y-auto">
        <div className="w-full flex flex-col px-5 py-5 gap-3">
            <ChatMessage side="left" />
            <ChatMessage side="right" />
            <ChatMessage side="left" />
        </div>
    </div>
  )
}

export default ChatMessagePane