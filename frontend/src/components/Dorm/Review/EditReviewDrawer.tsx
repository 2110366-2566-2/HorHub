import React, { useEffect, useState } from 'react'
import { ImageType } from 'react-images-uploading';
import { Review } from '../../../lib/type/Review';
import { Drawer, Rating } from '@mui/material';
import ImagesInput from '../../Form/ImagesInput';
import { uploadImages } from '../../../lib/firebase';

const EditReviewDrawer = ({myReview, onEdit}: {myReview: Review, onEdit: (data: {rating: number, description: string, images: string[]}) => void}) => {
    const [open, setOpen] = useState(false);
    const [allowSend, setAllowSend] = useState<boolean>(true)


    const [rating, setRating] = useState<number>(3)
    const [description, setDescription] = useState<string>("")
    const [images, setImages] = useState<ImageType[]>([])

    async function onSubmit() {
        setAllowSend(false)

        // Store images
        const imagesURL = await uploadImages(images, 'reviews')

        onEdit({
          rating: rating,
          description: description.trim(),
          images: imagesURL
        })

        setOpen(false)
        setAllowSend(true)
    }



    useEffect(() => {
        if (!myReview) return

        setRating(myReview.rating)
        setDescription(myReview.description)
        setImages(myReview.images.map((url: string) => {return {dataURL: url}}))

    }, [myReview])

    return (
        <>
          <button className="primary-button" onClick={() => setOpen(true)}>
            Edit
          </button>
          <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
            <div className="px-5 py-5 gap-3 relative">
              <div className="flex items-center gap-3">
                <div className="label-text font-semibold">Rating</div>
                <Rating value={rating} onChange={(event, newValue) => {if (newValue) setRating(newValue)}} />
              </div>
    
              <label className="form-control w-full">
                <div className="label">
                    <span className="label-text font-semibold">Description</span>
                </div>
                <textarea 
                    placeholder="..."
                    className={"input input-bordered input-sm w-full h-32 bg-white resize-none"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value.substring(0, 2040))} />
              </label>
    
              <ImagesInput
                fieldName="Attached Images"
                maxNumber={10}
                images={images}
                setImages={setImages}
                isButtonsLeft={true}
              />
              <div className="w-full flex justify-end">
                {
                  (allowSend && description.trim() !== "") ? <button className="absolute bottom-5 right-5 primary-button" onClick={onSubmit}>Edit</button>
                  : <button className="absolute bottom-5 right-5 disabled-button" disabled>Edit</button>
                }
              </div>
              
              
            </div>
    
          </Drawer>
        </>
    )
}

export default EditReviewDrawer