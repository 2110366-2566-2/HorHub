import React from 'react'

const ChatMessageText = ({ text }: { text: string }) => {
  return (
    <div className="chat-bubble bg-indigo-50">
        {text}
    </div>
  )
}

export default ChatMessageText