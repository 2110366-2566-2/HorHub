import React, { useEffect, useState } from 'react'
import Tab from '../../components/Tab/Tab'
import { useUser } from '../../lib/context/UserContext'
import LoadingPage from '../etc/LoadingPage'
import NotFoundPage from '../etc/NotFoundPage'




const BookingListPage = () => {

  const {currentUser, isLoading} = useUser()

  const [tabState, setTabState] = useState<string>("current")

  const tabOptions = [
    {
      name: "Current Reservations",
      onClick: () => setTabState("current"),
      isActive: tabState == "current"
    },
    {
      name: "Past Reservations",
      onClick: () => setTabState("past"),
      isActive: tabState == "past"
    }
  ]

  useEffect(() => {
    window.document.title = "My Reservation | HorHub"
  }, [])

  if (isLoading) {
    return <LoadingPage />
  }

  if (!currentUser || (currentUser.role != "Customer")) {
    return <NotFoundPage />
  }



  return (
    <div className="page">
        <div className="w-full flex flex-col gap-3">
            <text className="text-xl font-bold">My Reservation</text>
            <Tab options={tabOptions} />
        </div>
    </div>
  )
}

export default BookingListPage