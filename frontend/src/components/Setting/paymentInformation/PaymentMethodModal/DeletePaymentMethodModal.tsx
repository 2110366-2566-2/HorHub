import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri';

const DeletePaymentMethodModal = ({id, deleteFunction}: {id: string, deleteFunction: () => void}) => {
  return (
    <>
        <button className="p-1 rounded-md transition-colors hover:bg-red-200" onClick={()=>{
            if (document) {
                (document.getElementById('delete_payment_modal_' + id) as HTMLFormElement).showModal();
            }
        }}><RiDeleteBin6Line className="w-4 h-4" /></button>
        <dialog id={"delete_payment_modal_" + id} className="modal">
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg">Deleting Method</h3>
            <p className="py-4">Are you sure to delete this method?</p>
            <div className="w-full flex justify-center gap-2">
              <form method="dialog">
                <button className="bordered-button">Cancel</button>
              </form> 
              <button className="primary-button" onClick={deleteFunction}>Delete</button>
            </div>
          </div>
          
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
    </>
  )
}

export default DeletePaymentMethodModal