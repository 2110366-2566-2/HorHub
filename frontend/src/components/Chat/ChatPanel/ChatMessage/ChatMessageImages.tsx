import React from 'react'

const ChatMessageImages = ({ images }: { images: string[] }) => {
  return (
    <div className="flex flex-col gap-2 h-fit">
        {
            images.map((image, idx) => {
                return (
                    <img src={image} key={idx} className="w-64 object-cover"/>
                )
            })
        }
    </div>
  )
}

export default ChatMessageImages