import React, { useEffect, useState } from 'react'
import { Review } from '../../../lib/type/Review';
import ReviewCell from './ReviewCell';
import { Divider } from '@mui/material';
import OverallRatingPane from './OverallRatingPane';
import { useUser } from '../../../lib/context/UserContext';
import CustomerReviewPane from './CustomerReviewPane';
import { Bounce, toast } from 'react-toastify';

const ReviewPane = ({dormId}: {dormId: string}) => {

    const [isValid, setValid] = useState<boolean>(false)
    const [data, setData] = useState<Review[]>([])
    const [myReview, setMyReview] = useState<Review | undefined>(undefined)

    const {currentUser, isLoading} = useUser()

    async function fetchData() {
        try {
            const result = await fetch(
                process.env.REACT_APP_BACKEND_URL + "/dorms/" + dormId + "/reviews",
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
            );
            if (result.ok) {
                const data: Review[] = await result.json()

                setData(data)
                setValid(true)

                if (!currentUser) {
                    return
                }

                let fetchMyReview = undefined

                for (let review of data) {
                    if (review.customerId === currentUser.id) {
                        fetchMyReview = {...review}
                    }
                }

                setMyReview(fetchMyReview)

            }
        }
        catch (err) {
            
        }
    }


    async function deleteMyReview() {
        if (!myReview) return

        try {
            const res = await fetch(
                process.env.REACT_APP_BACKEND_URL +
                  "/reviews/" +
                  myReview.id,
                {
                  method: "DELETE",
                  credentials: "include",
                }
            );

            if (res.ok) {
                toast.success('Delete review successfully!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                fetchData()
            }


        } catch (err) {
            console.log(err)
        }
    }

    async function createReview(data: {rating: number, description: string, images: string[]}) {
        try {
            const result = await fetch(process.env.REACT_APP_BACKEND_URL + "/dorms/" + dormId + "/reviews",{
                method : "POST",
                credentials : 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(data)
            })

            if (result.ok) {
                toast.success('Create review successfully!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                fetchData()
            }

        } catch (err) {
            console.log(err)
        }
    }

    async function updateReview(data: {rating: number, description: string, images: string[]}) {
        if (!myReview) return

        try {
            const result = await fetch(process.env.REACT_APP_BACKEND_URL + "/reviews/" + myReview.id,{
                method : "PUT",
                credentials : 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(data)
            })

            if (result.ok) {
                toast.success('Update review successfully!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                fetchData()
            }

        } catch (err) {
            console.log(err)
        }
    }



    useEffect(() => {
        setValid(false)
        fetchData()
    }, [dormId, isLoading])





    if (dormId === "" || !isValid) return <></>

    return (
        <div className="flex flex-col w-full px-3 gap-3">
            <OverallRatingPane ratingList={data.map((review) => review.rating)} />
            {
                (currentUser && currentUser.role === "Customer") && (
                    <>
                        <Divider component="div" />
                        <div className="flex flex-col w-full gap-3">
                            <div className="font-bold">My Review</div>
                            <CustomerReviewPane 
                                dormId={dormId} 
                                myReview={myReview} 
                                onDelete={deleteMyReview} 
                                onCreate={createReview}
                                onEdit={updateReview}
                            />
                        </div>
                    </>
                )
            }
            
            <Divider component="div" />
            <div className="flex flex-col w-full gap-3">
                <div className="font-bold">All Reviews ({data.length})</div>
                <div>
                    {
                        data.map((review) => {
                            return (
                                <ReviewCell key={review.id} data={review} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ReviewPane