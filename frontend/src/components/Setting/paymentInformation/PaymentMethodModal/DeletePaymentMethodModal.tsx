import React from 'react'

const DeletePaymentMethodModal = ({deleteFunction}: {deleteFunction: () => void}) => {
  return (
    <>
        <button className="secondary-button" onClick={()=>{
            if (document) {
                (document.getElementById('add_payment_modal') as HTMLFormElement).showModal();
            }
        }}>Delete</button>
        <dialog id="add_payment_modal" className="modal">
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