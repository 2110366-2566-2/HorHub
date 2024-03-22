import React from 'react'
import ChatMessageText from './ChatMessageText'
import ChatMessageImages from './ChatMessageImages'
import ChatMessageLocation from './ChatMessageLocation'
import { Message } from '../../../../lib/type/Chat'

type ChatMessageProps = {
    side: "left" | "right",
    message: Message,
    anotherUserAvatar: string
}

const ChatMessage = ({ side, message, anotherUserAvatar }: ChatMessageProps) => {
    if (side === "left") {
        return (
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src={anotherUserAvatar} />
                    </div>
                </div>
                <div className="text-slate-600 text-xs">{(new Date(message.sentAt)).toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"})}</div>
                {
                    (message.type === "Text") ? <ChatMessageText text={message.text || ""} /> :
                    (message.type === "Images") ? <ChatMessageImages images={(message.pictures) ? message.pictures : []} /> :
                    <ChatMessageLocation latitude={(message.latitude) ? message.latitude : 0} longitude={(message.longitude ? message.longitude : 0)} />
                }
            </div>
        )
    }
    else {
        return (
            <div className="chat chat-end flex flex-col">
                <div className="text-slate-600 text-xs">{(new Date(message.sentAt)).toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"})}</div>
                {
                    (message.type === "Text") ? <ChatMessageText text={message.text || ""} /> :
                    (message.type === "Images") ? <ChatMessageImages images={(message.pictures) ? message.pictures : []} /> :
                    <ChatMessageLocation latitude={(message.latitude) ? message.latitude : 0} longitude={(message.longitude ? message.longitude : 0)} />
                }
            </div>
        )
    }
  
}

export default ChatMessage