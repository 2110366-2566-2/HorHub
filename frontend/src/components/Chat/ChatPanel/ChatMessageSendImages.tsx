import React, { useState } from 'react'
import { FaImage } from 'react-icons/fa'
import { ImageType } from 'react-images-uploading';
import ImagesInput from '../../Form/ImagesInput';
import { Drawer } from '@mui/material';

const ChatMessageSendImages = ({ images, setImages, submitImages }: { images: ImageType[], setImages: React.Dispatch<React.SetStateAction<ImageType[]>>, submitImages: () => void }) => {
  const [open, setOpen] = useState(false);

  const [allowSend, setAllowSend] = useState<boolean>(true)

  function submit() {
    setAllowSend(false)
    submitImages()
    setImages([])
    setOpen(false)
    setAllowSend(true)
  }
  
  return (
    <>
      <button onClick={() => setOpen(true)}>
        <FaImage className="text-xl fond-bold text-indigo-600" />
      </button>
      <Drawer anchor="bottom" open={open} onClose={() => setOpen(false)}>
        <div className="px-5 py-5 relative">
          <ImagesInput
            fieldName="Insert images here"
            maxNumber={10}
            images={images}
            setImages={setImages}
            isButtonsLeft={true}
          />
          {
            (allowSend && images.length > 0) ? <button className="absolute bottom-5 right-5 primary-button" onClick={submit}>Send</button>
            : <button className="absolute bottom-5 right-5 disabled-button" disabled>Send</button>
          }
          
        </div>

      </Drawer>
    </>
  )
}

export default ChatMessageSendImages