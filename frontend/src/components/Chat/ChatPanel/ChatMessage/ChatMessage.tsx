import React from 'react'
import ChatMessageText from './ChatMessageText'
import ChatMessageImages from './ChatMessageImages'
import ChatMessageLocation from './ChatMessageLocation'

type ChatMessageProps = {
    type?: "Text" | "Images" | "Location",
    side: "left" | "right",
    data?: {
        content?: string,
        images?: string[],
        latitude?: number,
        longitude?: number
    },
    sender?: {
        id: string,
        avatar: string
    }
    sendAt?: Date
}

const ChatMessage = ({ side }: ChatMessageProps) => {
    if (side === "left") {
        return (
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src="https://static.wixstatic.com/media/665921_098e318fa36b4c958e3e73212e6c983d~mv2.jpg/v1/fill/w_800,h_1000,al_c,q_85/BMEWEB_FACULTY-1.jpg" />
                    </div>
                </div>
                <ChatMessageImages images={["https://firebasestorage.googleapis.com/v0/b/horhub-7d1df.appspot.com/o/avatars%2F1710217830757-IMG_3564.jpg?alt=media&token=c77d035b-fc19-4fdd-8f03-61b39c2bfc2a"]} />
            </div>
        )
    }
    else {
        return (
            <div className="chat chat-end">
                <ChatMessageLocation latitude={0} longitude={0} />
            </div>
        )
    }
  
}

export default ChatMessage