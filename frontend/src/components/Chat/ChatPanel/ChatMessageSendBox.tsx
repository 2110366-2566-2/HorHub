import React, { useState } from 'react'
import { FaImage } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosSend } from 'react-icons/io'
import { socket } from '../../../lib/socket'
import { useUser } from '../../../lib/context/UserContext'
import { ImageType } from 'react-images-uploading'
import { uploadImages } from '../../../lib/firebase'
import ChatMessageSendImages from './ChatMessageSendImages'
import ChatMessageSendLocation from './ChatMessageSendLocation'
import { Chat } from '../../../lib/type/Chat'

const ChatMessageSendBox = ({ chat, chatId, sendTo }: { chat: Chat, chatId: string, sendTo: string }) => {

  const {currentUser, isLoading} = useUser()

  const [text, setText] = useState<string>("")
  const [images, setImages] = useState<ImageType[]>([])
  const [latitude, setLatitude] = useState<number>(13.73377)
  const [longitude, setLongitude] = useState<number>(100.63558)
  
  function submitText(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!currentUser || text.length === 0) {
      return
    }
    socket.emit(`chats:sendMessage`, {
      senderId: currentUser.id,
      chatId: chatId,
      type: "Text",
      text: text,
      sentAt: new Date()
    }, (chat.participantA.id === currentUser.id) ? "A" : "B", sendTo)
    setText("")
  }

  async function submitImages() {
    if (!currentUser){
      return false;
    }
    const imagesURL = await uploadImages(images, 'chats/' + chatId + '/images')

    socket.emit(`chats:sendMessage`, {
      senderId: currentUser.id,
      chatId: chatId,
      type: "Images",
      pictures: imagesURL,
      sentAt: new Date()
    }, (chat.participantA.id === currentUser.id) ? "A" : "B", sendTo)
  }

  async function submitLocation() {
    if (!currentUser){
      return false;
    }

    socket.emit(`chats:sendMessage`, {
      senderId: currentUser.id,
      chatId: chatId,
      type: "Location",
      latitude: latitude,
      longitude: longitude,
      sentAt: new Date()
    }, (chat.participantA.id === currentUser.id) ? "A" : "B", sendTo)
  }

  return (
    <div className="w-full h-16 flex items-center bg-indigo-100 gap-4 px-5">
        {/* <button><FaLocationDot className="text-xl fond-bold text-indigo-600" /></button> */}
        {/* <button><FaImage className="text-xl fond-bold text-indigo-600" /></button> */}
        <ChatMessageSendLocation
          latitude={latitude}
          longitude={longitude}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          submitLocation={submitLocation}
        />
        <ChatMessageSendImages images={images} setImages={setImages} submitImages={submitImages} />
        <form className="flex items-center w-full gap-4" onSubmit={submitText}>
          <input 
            type="text" 
            className="block w-full p-2 ps-5 text-sm text-gray-900 border border-gray-300 rounded-2xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Aa"
            value={text}
            onChange={(e) => setText(e.target.value.substring(0, 512))}
          />
          <button type="submit"><IoIosSend className="text-xl fond-bold text-indigo-600" /></button>
        </form>
    </div>
  )
}

export default ChatMessageSendBox