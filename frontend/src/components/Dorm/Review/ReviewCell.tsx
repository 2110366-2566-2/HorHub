import React from 'react'
import { Review } from '../../../lib/type/Review'
import { Avatar, Rating } from '@mui/material'
import ImageModal from '../../Image/ImageModal'

const ReviewCell = ({data}: {data: Review}) => {
  return (
    <div className="w-full flex flex-col px-3 gap-3">
        <div className="w-full flex justify-between item-center">
            <div className="flex gap-3 items-center">
                <Avatar src={data.customer?.imageURL || ""} />
                <div className=" flex flex-col gap-1">
                    <div className="text-sm font-bold">{data.customer?.displayName || ""}</div>
                    <div className="text-xs">{(new Date(data.reviewAt)).toLocaleString()}</div>
                </div>
            </div>
            <div>
                <Rating name="read-only" value={data.rating} readOnly />
            </div>
        </div>
        <div className="text-sm whitespace-pre-line break-words">
            {data.description}
        </div>
        <div className="flex overflow-x-auto items-center w-full">
            <div className="flex gap-3">
                {
                    data.images.map((img, idx) => {
                        return (
                            <ImageModal key={idx} image={img} />
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default ReviewCell