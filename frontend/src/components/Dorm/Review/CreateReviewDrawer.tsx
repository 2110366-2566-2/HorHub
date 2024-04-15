import { Drawer, Rating } from '@mui/material';
import React, { useState } from 'react'
import ImagesInput from '../../Form/ImagesInput';
import { ImageType } from 'react-images-uploading';
import { z } from 'zod';
import TextAreaInput from '../../Form/TextAreaInput';
import { uploadImages } from '../../../lib/firebase';

const CreateReviewDrawer = ({onCreate} : {onCreate: (data: {rating: number, description: string, images: string[]}) => void}) => {
    const [open, setOpen] = useState(false);
    const [allowSend, setAllowSend] = useState<boolean>(true)


    const [rating, setRating] = useState<number>(3)
    const [description, setDescription] = useState<string>("")
    const [images, setImages] = useState<ImageType[]>([])

    async function onSubmit() {
      setAllowSend(false)

      // Store images
      const imagesURL = await uploadImages(images, 'reviews')

      onCreate({
        rating: rating,
        description: description.trim(),
        images: imagesURL
      })

      setOpen(false)
      setAllowSend(true)

      setRating(3)
      setDescription("")
      setImages([])

    }

    return (
    <>
      <button className="primary-button" onClick={() => setOpen(true)}>
        Create
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
              (allowSend && description.trim() !== "") ? <button className="absolute bottom-5 right-5 primary-button" onClick={onSubmit}>Create</button>
              : <button className="absolute bottom-5 right-5 disabled-button" disabled>Create</button>
            }
          </div>
          
          
        </div>

      </Drawer>
    </>
  )
}

export default CreateReviewDrawer