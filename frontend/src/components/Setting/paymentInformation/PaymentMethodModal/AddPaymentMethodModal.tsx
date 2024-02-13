import React from 'react'

const AddPaymentMethodModal = ({addFunction}: {addFunction: () => void}) => {
  return (
    <>
        <button className="secondary-button" onClick={()=>{
            if (document) {
                (document.getElementById('add_payment_modal') as HTMLFormElement).showModal();
            }
        }}>Delete</button>
        <dialog id="add_payment_modal" className="modal">
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg">Adding Method</h3>
            
            <div className="w-full flex justify-center gap-2">
              <form method="dialog">
                <button className="bordered-button">Cancel</button>
              </form> 
              <button className="primary-button" onClick={addFunction}>Delete</button>
            </div>
          </div>
          
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
    </>
  )
}

export default AddPaymentMethodModal