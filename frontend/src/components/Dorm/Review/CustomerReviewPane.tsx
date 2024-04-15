import React, { useEffect, useState } from 'react'
import { useUser } from '../../../lib/context/UserContext'
import { Review } from '../../../lib/type/Review'
import { BookingType } from '../../../lib/type/Booking'
import ReviewCell from './ReviewCell'
import DeleteReviewButton from './DeleteReviewButton'
import CreateReviewDrawer from './CreateReviewDrawer'
import EditReviewDrawer from './EditReviewDrawer'

const CustomerReviewPane = ({dormId, myReview, onDelete, onCreate, onEdit}: 
    {dormId: string, 
    myReview: Review | undefined,
    onDelete: () => void, 
    onCreate: (data: {rating: number, description: string, images: string[]}) => void,
    onEdit: (data: {rating: number, description: string, images: string[]}) => void}) => {

    const {currentUser, isLoading} = useUser()

    const [ability, setAbility] = useState<boolean>(false)

    async function initAbility() {
        if (!currentUser) return

        try {
            const res = await fetch(
                process.env.REACT_APP_BACKEND_URL +
                  "/users/" +
                  currentUser.id +
                  "/bookings",
                {
                  method: "GET",
                  credentials: "include",
                }
              );

            if (res.ok) {
                const data: BookingType[] = await res.json()

                for (let booking of data) {
                    if (booking.roomType.dormId === dormId && booking.status === "Completed") {
                        setAbility(true)
                        return
                    }
                }

                setAbility(false)
            }
            else {
                setAbility(false)
            }
        
        } catch (err) {
            setAbility(false)
        }
    }



    useEffect(() => {
        initAbility()
    }, [dormId, isLoading])



    if (!currentUser) return <></>

    return (
        <div className="w-full flex flex-col gap-3 items-center">
            {
                (myReview) ? (
                    <>
                        <ReviewCell data={myReview} />
                        <div className="w-full flex justify-end gap-3">
                            <EditReviewDrawer myReview={myReview} onEdit={onEdit} />
                            <DeleteReviewButton onDelete={onDelete} />
                        </div>
                    </>
                ) : (ability) ? (
                    <>
                        <div>You haven't post your review yet</div>
                        <CreateReviewDrawer onCreate={onCreate} />
                    </>
                ) : (
                    <>
                        <div>You cannot post your review to this dorm</div>
                    </>
                )
            }
        </div>
    )
}

export default CustomerReviewPane