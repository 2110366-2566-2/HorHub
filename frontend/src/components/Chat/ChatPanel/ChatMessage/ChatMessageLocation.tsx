import React from 'react'
import DormMap from '../../../Dorm/DormMap'

const ChatMessageLocation = ({ latitude, longitude }: { latitude: number, longitude: number }) => {
  return (
    <div className="w-72 aspect-video">
        <DormMap lat={latitude} lng={longitude} />
    </div>
  )
}

export default ChatMessageLocation