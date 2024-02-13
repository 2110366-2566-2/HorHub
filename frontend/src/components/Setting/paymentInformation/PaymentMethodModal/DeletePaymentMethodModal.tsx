import React from 'react'

const DeletePaymentMethodModal = ({id, deleteFunction}: {id: string, deleteFunction: () => void}) => {
  return (
    <>
        <button className="secondary-button" onClick={()=>{
            if (document) {
                (document.getElementById('delete_payment_modal_' + id) as HTMLFormElement).showModal();
            }
        }}>X</button>
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