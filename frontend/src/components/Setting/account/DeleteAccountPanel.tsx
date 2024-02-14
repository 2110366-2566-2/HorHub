import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import TextInput from '../../Form/TextInput';
import { useUser } from '../../../lib/context/UserContext';


const schema = z.object({
  password: z.string().trim().min(8, {message: 'Password must be at least 8 characters'})
})

type ValidationSchemaType = z.infer<typeof schema>;



const DeleteAccountPanel = () => {

  const {currentUser, isLoading,fetchUser} = useUser()

  const [enableButton, setEnableButton] = useState<boolean>(true)
  const [isPassWrong, setPassWrong] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
    await fetchUser();
    if (!currentUser) {
      return;
    }
    setEnableButton(false)
    setPassWrong(false)
    try {
      const result = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/" + currentUser?.id,{
        method : "DELETE",
        credentials : 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({password: data.password})
      })
      if (result.ok) {
        document.location = '/'
      }
      else {
        setPassWrong(true)
        setEnableButton(true)
      }
      
    }
    catch {
      setEnableButton(true)
    }
  }


  return (
    <div className="flex flex-col w-full gap-3">
        <div className="border-b border-slate-300 my-2 font-bold text-left text-red-700">Delete Account</div>
        <div className="text-sm w-full text-left">This is an irreversible process, think carefully before deleting the account</div>
            

            <div className="w-full flex justify-start">
              <button 
                type="submit"
                className="danger-button" 
                onClick={()=>{
                    if (document) {
                        (document.getElementById('delete_account_modal') as HTMLFormElement).showModal();
                    }
                }}>
                Delete account
              </button>
              <dialog id="delete_account_modal" className="modal">
                  <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg text-red-700">Delete Account</h3>
                    <span className="text-red-700 text-sm">Warning: This is an irreversible process, think carefully before deleting the account. Your account will be lost forever!</span>
                    <form className="flex-col w-full" onSubmit = {handleSubmit(onSubmit)}>
                        <TextInput 
                            type="password" 
                            name="password" 
                            fieldName="Password" 
                            placeholder="Password..." 
                            register={register} 
                            error={errors.password} 
                        />
                        {
                            isPassWrong && <div className="label-text-alt text-red-700 text-left pl-1 pb-2">The password is wrong</div>
                        }
                        {
                            enableButton ? <button className="danger-button w-fit h-fit" type="submit">Delete account</button>
                            : <button className="disabled-button w-fit h-fit">Delete account</button>
                        }
                      
                    </form>
                    <div className="w-full flex justify-center gap-2">
                    
                    </div>
                  </div>
                    
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
            </div>

        
    </div>
  )
}

export default DeleteAccountPanel