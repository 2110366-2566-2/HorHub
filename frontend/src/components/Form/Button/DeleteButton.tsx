import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteButton = ({onClick} : {onClick: () => void}) => {
  return (
    <button type="button" onClick={onClick} className="p-1 rounded-md transition-colors hover:bg-red-200">
        <RiDeleteBin6Line className="w-4 h-4" />
    </button>
  )
}

export default DeleteButton