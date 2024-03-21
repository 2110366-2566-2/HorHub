import React, { useEffect, useState } from 'react'
import { useUser } from '../../lib/context/UserContext'
import LoadingPage from '../etc/LoadingPage'
import NotFoundPage from '../etc/NotFoundPage'
import ChatSearchBox from '../../components/Chat/ChatSearchBox'
import ChatListElement from '../../components/Chat/ChatListElement'
import ChatPanel from '../../components/Chat/ChatPanel/ChatPanel'
import { Chat } from '../../lib/type/Chat'
import { useParams } from 'react-router-dom'

const ChatPage = () => {

    let { chatId } = useParams();

    const {currentUser, isLoading} = useUser()

    const [searchName, setSearchName] = useState<string>("")

    const [chatRooms, setChatRooms] = useState<Chat[]>([])





    async function initChatRooms() {
        if (!currentUser) return
        try {
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/" + currentUser.id + "/chats", {
                method: "GET",
                credentials: "include"
            })
            if (res.ok) {
                const data = await res.json()
                
                setChatRooms(data)

                console.log(data)

            }
        }
        catch (err) {
            console.log("error")
        }        
    }

    useEffect(() => {
        if (currentUser) {
            initChatRooms()
        }
    }, [isLoading])



    if (isLoading) return <LoadingPage />
    if (!currentUser) return <NotFoundPage />

    return (
    <div className="w-full h-[calc(100vh-7rem)] flex">
        <div className="h-full w-1/4 flex flex-col border-r border-slate-200">
            <ChatSearchBox value={searchName} onChange={(e) => {setSearchName(e.target.value)}} />
            <div className="w-full h-full overflow-y-auto">
                <div className="flex flex-col flex-nowarp">
                    {
                        chatRooms.map((chat) => {
                            return (
                                <ChatListElement key={chat.id} chat={chat} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
        <div className="h-full w-3/4 flex flex-col">
            {
                (chatId) && <ChatPanel />
            }
        </div>
    </div>
    )
}

export default ChatPage