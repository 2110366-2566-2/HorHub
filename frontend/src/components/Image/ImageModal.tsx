import { Box, Modal } from '@mui/material';
import React, { useState } from 'react'

const ImageModal = ({image}: {image: string}) => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <div onClick={() => setOpen(true)} className="w-40 h-40 aspect-square">
                <img src={image} className="w-24 h-24 md:w-40 md:h-40 aspect-square object-cover" />
            </div>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              className="flex justify-center items-center w-full h-full"
            >
              <Box className="flex justify-center items-center w-fit h-fit">
                <img src={image} className="max-w-[80vw] max-h-[80vh]" />
              </Box>
            </Modal>
        </>
    )
}

export default ImageModal