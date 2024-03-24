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
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
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
                return <>
                  {
                    (idx === 0 || (new Date(messages[idx].sentAt)).toDateString() !== (new Date(messages[idx-1].sentAt)).toDateString()) &&
                    <div key={idx + "-breaker"} className="flex flex-row justify-between items-center">
                      <div className="flex ms-2 me-2 border-t border-1 border-gray-400 flex-grow w-[40%]"></div>
                      <div className="flex text-center text-indigo-700 font-bold text-sm">{(new Date(message.sentAt)).toDateString()}</div>
                      <div className="flex ms-2 me-2 border-t border-1 border-gray-400 flex-grow w-[40%]"></div>
                    </div>
                  }
                  <ChatMessage 
                    key={idx} 
                    side={(myUser.id === message.senderId) ? "right" : "left"} 
                    anotherUserAvatar={anotherUser.imageURL} message={message} 
                  />
                </>
              })
            }
            <div ref={messagesEndRef} />
        </div>
    </div>
  )
}

export default ChatMessagePane