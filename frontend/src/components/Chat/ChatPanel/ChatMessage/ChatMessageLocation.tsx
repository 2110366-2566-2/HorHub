import React, { useState } from 'react'
import DormMap from '../../../Dorm/DormMap'
import { Box, Modal } from '@mui/material'

const ChatMessageLocation = ({ latitude, longitude }: { latitude: number, longitude: number }) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <div onClick={() => setOpen(true)} className="w-72 aspect-video">
          <DormMap lat={latitude} lng={longitude} />
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className="flex justify-center items-center"
      >
        <Box className="flex justify-center items-center w-3/4 h-3/4">
          <DormMap lat={latitude} lng={longitude} />
        </Box>
      </Modal>
    </>
    
  )
}

export default ChatMessageLocation