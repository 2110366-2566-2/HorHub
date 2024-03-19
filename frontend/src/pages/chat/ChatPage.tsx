import React, { useState } from 'react'
import { useUser } from '../../lib/context/UserContext'
import LoadingPage from '../etc/LoadingPage'
import NotFoundPage from '../etc/NotFoundPage'
import ChatSearchBox from '../../components/Chat/ChatSearchBox'
import ChatListElement from '../../components/Chat/ChatListElement'
import ChatPanel from '../../components/Chat/ChatPanel/ChatPanel'

const ChatPage = () => {

    const {currentUser, isLoading} = useUser()

    const [searchName, setSearchName] = useState<string>("")

    if (isLoading) return <LoadingPage />
    if (!currentUser) return <NotFoundPage />

    return (
    <div className="w-full h-[calc(100vh-7rem)] flex">
        <div className="h-full w-1/4 flex flex-col border-r border-slate-200">
            <ChatSearchBox value={searchName} onChange={(e) => {setSearchName(e.target.value)}} />
            <div className="w-full h-full overflow-y-auto">
                <div className="flex flex-col flex-nowarp">
                    <ChatListElement />
                    <ChatListElement />
                    <ChatListElement />
                    <ChatListElement />
                    <ChatListElement />
                    <ChatListElement />
                    <ChatListElement />
                    <ChatListElement />
                    <ChatListElement />
                    <ChatListElement />
                    <ChatListElement />
                    <ChatListElement />
                    <ChatListElement />
                    <ChatListElement />
                    <ChatListElement />
                    <ChatListElement />
                    <ChatListElement />
                    <ChatListElement />
                </div>
            </div>
        </div>
        <div className="h-full w-3/4 flex flex-col">
            <ChatPanel />
        </div>
    </div>
    )
}

export default ChatPage