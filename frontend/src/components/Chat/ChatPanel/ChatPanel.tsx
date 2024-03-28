import React, { useEffect, useRef, useState } from 'react'
import ChatTitle from './ChatTitle'
import ChatMessageSendBox from './ChatMessageSendBox'
import ChatMessagePane from './ChatMessagePane'
import { socket } from '../../../lib/socket'
import { useParams } from 'react-router-dom'
import { useUser } from '../../../lib/context/UserContext'
import { Chat, Message } from '../../../lib/type/Chat'

const ChatPanel = ({ chatId }: { chatId: string }) => {
  // let { chatId } = useParams();

  const {currentUser, isLoading} = useUser()

  const [isFetching, setFetching] = useState<boolean>(true)
  const [isInvalid, setInvalid] = useState<boolean>(false)

  const [chatRoom, setChatRoom] = useState<Chat>()
  const [messages, setMessages] = useState<Message[]>([])

  


  async function initRoom() {
    
    if (!currentUser) return
    setFetching(true)
    setInvalid(false)
    try {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/chats/" + chatId, {
        method: "GET",
         credentials: "include"
      })
      if (res.ok) {
        const data = await res.json()

        setChatRoom(data)
        setMessages(data.messages)

        console.log(data)

        const readRes = await fetch(process.env.REACT_APP_BACKEND_URL + "/chats/" + chatId + "/read", {
          method: "PUT",
          credentials: "include"
        })

        setFetching(false)

      }
      else {
        setInvalid(true)
        setFetching(false)
      }
    }
    catch (err) {
      setInvalid(true)
      setFetching(false)
    }        
  }

  function addMessage(newMessage: Message) {
    const newMessages = [...messages, newMessage]
    setMessages(newMessages)
  }


  useEffect(() => {
    initRoom()
  }, [isLoading, chatId])

  // useEffect(() => {
  //   console.log(id)
  // }, [id])

  // useEffect(() => {
  //   setMessages([])
  // }, [chatId])

  useEffect(() => {
    socket.on(`chats:${chatId}:addMessage`, (message) => addMessage(message))
    
    return function cleanup() {
      socket.off(`chats:${chatId}:addMessage`)
    };
  }, [messages, chatId])

  // useEffect(() => {
  //   console.log(messages)
  // }, [messages])

  if (!currentUser || !chatRoom || isInvalid) {
    return <></>
  }

  return (
    <div className="w-full h-full flex flex-col justify-between">
        <ChatTitle chat={chatRoom} />
        <ChatMessagePane
          myUser={(currentUser.id === chatRoom.participantA.id) ? chatRoom.participantA : chatRoom.participantB}
          anotherUser={(currentUser.id === chatRoom.participantA.id) ? chatRoom.participantB : chatRoom.participantA}
          messages={messages}
        />
        <ChatMessageSendBox chat={chatRoom} chatId={chatId || ""} sendTo={(currentUser.id === chatRoom.participantA.id) ? chatRoom.participantB.id : chatRoom.participantA.id} />
    </div>
  )
}

export default ChatPanel