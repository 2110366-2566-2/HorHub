import React, { useEffect, useRef } from 'react'
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

  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    setTimeout(() => {
      scrollToBottom()
    }, 500)
  }, [messages]);


  return (
    <div className="w-full h-full overflow-y-auto">
        <div className="w-full flex flex-col px-5 py-5 gap-3">
            {
              messages.map((message, idx) => {
                return <ChatMessage 
                          key={idx} 
                          side={(myUser.id === message.senderId) ? "right" : "left"} 
                          anotherUserAvatar={anotherUser.imageURL} message={message} 
                        />
              })
            }
            <div ref={messagesEndRef} />
        </div>
    </div>
  )
}

export default ChatMessagePane