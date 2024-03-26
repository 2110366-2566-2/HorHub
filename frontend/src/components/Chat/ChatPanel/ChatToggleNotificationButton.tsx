import { Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoMdNotifications, IoMdNotificationsOff } from 'react-icons/io'
import { useUser } from '../../../lib/context/UserContext'

const ChatToggleNotificationButton = ({ chatId }: {chatId: string}) => {
    const [allowNotification, setAllowNotification] = useState<boolean>(true)

    const {currentUser, isLoading} = useUser()

    function toggleNotification() {
        if (!currentUser) return

        if (allowNotification) {
            // Disable notification
            setAllowNotification(false)
            
            const disabledChatNotificationStr = localStorage.getItem('disabledChatNotification')

            if (!disabledChatNotificationStr) {
                localStorage.setItem('disabledChatNotification', JSON.stringify([{
                    userId: currentUser.id,
                    disabledChatId: [chatId]
                }]))
                return
            }

            const disabledChatNotificationJSON: {userId: string, disabledChatId: string[]}[] = JSON.parse(disabledChatNotificationStr)
            if (!disabledChatNotificationJSON) {
                localStorage.setItem('disabledChatNotification', JSON.stringify([{
                    userId: currentUser.id,
                    disabledChatId: [chatId]
                }]))
                return
            }

            const myDisabledChat = disabledChatNotificationJSON.find((value) => value.userId === currentUser.id)

            if (!myDisabledChat) {
                localStorage.setItem('disabledChatNotification', JSON.stringify([
                    ...disabledChatNotificationJSON.filter((value) => value.userId !== currentUser.id),
                    {
                        userId: currentUser.id,
                        disabledChatId: [chatId]
                    }
                ]))
                return
            }

            if (myDisabledChat.disabledChatId.includes(chatId)) {
                return
            }
            else {
                localStorage.setItem('disabledChatNotification', JSON.stringify([
                    ...disabledChatNotificationJSON.filter((value) => value.userId !== currentUser.id),
                    {
                        userId: currentUser.id,
                        disabledChatId: [...myDisabledChat.disabledChatId, chatId]
                    }
                ]))
            }

        }
        else {
            // Allow notification
            setAllowNotification(true)

            const disabledChatNotificationStr = localStorage.getItem('disabledChatNotification')
            if (!disabledChatNotificationStr) return

            const disabledChatNotificationJSON: {userId: string, disabledChatId: string[]}[] = JSON.parse(disabledChatNotificationStr)
            if (!disabledChatNotificationJSON) return
            

            const myDisabledChat = disabledChatNotificationJSON.find((value) => value.userId === currentUser.id)

            if (!myDisabledChat) return

            if (myDisabledChat.disabledChatId.includes(chatId)) {
                localStorage.setItem('disabledChatNotification', JSON.stringify([
                    ...disabledChatNotificationJSON.filter((value) => value.userId !== currentUser.id),
                    {
                        userId: currentUser.id,
                        disabledChatId: myDisabledChat.disabledChatId.filter((value) => value !== chatId)
                    }
                ]))
            }
        }
    }

    useEffect(() => {
        if (!currentUser) return

        try {
            const disabledChatNotificationStr = localStorage.getItem('disabledChatNotification')
            if (!disabledChatNotificationStr) {
                setAllowNotification(true)
                return
            }
    
            const disabledChatNotificationJSON: {userId: string, disabledChatId: string[]}[] = JSON.parse(disabledChatNotificationStr)
            if (!disabledChatNotificationJSON) {
                setAllowNotification(true)
                return
            }

            const myDisabledChat = disabledChatNotificationJSON.find((value) => value.userId === currentUser.id)

            if (!myDisabledChat) {
                setAllowNotification(true)
                return
            }

            if (myDisabledChat.disabledChatId.includes(chatId)) {
                setAllowNotification(false)
            }
            else {
                setAllowNotification(true)
            }

        }
        catch (err) {
            return
        }

        



    }, [isLoading, chatId])

    return (
    <Tooltip title="Toggle Notification">
        <button className="text-xl text-indigo-600" onClick={toggleNotification}>
            {
                (allowNotification) ? <IoMdNotifications /> : <IoMdNotificationsOff />
            }
        </button>
    </Tooltip>
    
    )
}

export default ChatToggleNotificationButton