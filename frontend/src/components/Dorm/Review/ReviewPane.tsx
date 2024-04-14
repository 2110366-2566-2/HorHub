import React, { useEffect, useState } from 'react'
import { Review } from '../../../lib/type/Review';
import ReviewCell from './ReviewCell';
import { Divider } from '@mui/material';
import OverallRatingPane from './OverallRatingPane';

const ReviewPane = ({dormId}: {dormId: string}) => {

    const [isValid, setValid] = useState<boolean>(false)
    const [data, setData] = useState<Review[]>([])

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
                const data = await result.json()

                setData(data)
                setValid(true)
            }
        }
        catch (err) {
            
        }
    }


    useEffect(() => {
        setValid(false)
        fetchData()
    }, [dormId])





    if (dormId === "" || !isValid) return <></>

    return (
        <div className="flex flex-col w-full px-3 gap-3">
            <OverallRatingPane ratingList={data.map((review) => review.rating)} />
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