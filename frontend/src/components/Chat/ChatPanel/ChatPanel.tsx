import React, { useEffect } from 'react'
import ChatTitle from './ChatTitle'
import ChatMessageSendBox from './ChatMessageSendBox'
import ChatMessagePane from './ChatMessagePane'
import { socket } from '../../../lib/socket'

const ChatPanel = () => {

  useEffect(() => {
    socket.on('connection', () => console.log('socket connected'))
  }, [])

  return (
    <div className="w-full h-full flex flex-col justify-between">
        <ChatTitle />
        <ChatMessagePane />
        <ChatMessageSendBox />
    </div>
  )
}

export default ChatPanel