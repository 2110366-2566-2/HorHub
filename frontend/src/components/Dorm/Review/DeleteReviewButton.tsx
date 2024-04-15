import React, { useState } from 'react'

const DeleteReviewButton = ({onDelete}: {onDelete: () => void}) => {

    const [allowSubmit, setAllowSubmit] = useState<boolean>(true)

    function onSubmit() {
        setAllowSubmit(false)
        onDelete()
        if (document) {
            (document.getElementById("delete_my_review") as HTMLFormElement).close()
        }
        setAllowSubmit(true)
    }

  return (
    <>
        <button
            type="submit" 
            className="danger-button"
            onClick={() => {
                if (document) {
                  (
                    document.getElementById(
                      "delete_my_review"
                    ) as HTMLFormElement
                  ).showModal();
                }
            }}>
            Delete
        </button>
        <dialog id={"delete_my_review"} className="modal">
          <div className="modal-box bg-white gap-3 space-y-3">
            <div className="font-bold text-lg text-center">
              Delete Your Review
            </div>
            <div className="text-sm">
              Are you sure to delete your review?
            </div>
            <div className="w-full flex justify-center gap-2">
              <form method="dialog">
                <button className="bordered-button">No</button>
              </form>
              {allowSubmit ? (
                <button
                  className="danger-button"
                  onClick={onSubmit}
                >
                  Yes
                </button>
              ) : (
                <button className="disabled-button" disabled>
                  Yes
                </button>
              )}
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
    </>
  )
}

export default DeleteReviewButton