import React, { useEffect, useState } from 'react'
import DormMap from '../../../Dorm/DormMap'
import { Box, Modal } from '@mui/material'

const ChatMessageLocation = ({ latitude, longitude }: { latitude: number, longitude: number }) => {
  const [open, setOpen] = useState<boolean>(false)

  // const [tempLat, setTempLat] = useState<number>(0)
  // const [tempLng, setTempLng] = useState<number>(0)

  const [tempState, setTempState] = useState<boolean>(false)

  useEffect(() => {
    setTempState(false)
    setTimeout(() => {
      setTempState(true)
    }, 80)
  }, [])


  return (
    <>
      <div onClick={() => setOpen(true)} className="w-72 aspect-video">
          {<DormMap key={tempState ? 0 : (new Date()).toTimeString()} lat={latitude} lng={longitude} />}
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className="flex justify-center items-center w-full h-full"
      >
        <Box className="flex justify-center items-center w-3/4 aspect-video">
          <DormMap lat={latitude} lng={longitude} />
        </Box>
      </Modal>
    </>
    
  )
}

export default ChatMessageLocation