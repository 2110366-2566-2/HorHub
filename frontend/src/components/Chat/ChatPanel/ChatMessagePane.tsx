import React from 'react'
import ChatMessage from './ChatMessage/ChatMessage'
import { Message } from '../../../lib/type/Chat'

type ChatMessagePanelProps = {
  myUser: {
    id: string,
    displayName: string,
    imageURL: string
  },
  anotherUser: {
    id: string,
    displayName: string,
    imageURL: string
  },
  messages: Message[]
}


const ChatMessagePane = ({ myUser, anotherUser, messages }: ChatMessagePanelProps) => {
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