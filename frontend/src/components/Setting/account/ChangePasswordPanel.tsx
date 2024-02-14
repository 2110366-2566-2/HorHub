import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import TextInput from '../../Form/TextInput';
import { useUser } from '../../../lib/context/UserContext';


const schema = z.object({
  oldPassword: z.string().trim().min(1, {message: 'Please fill this field'}),
  newPassword: z.string().trim().min(8, {message: 'Password must be at least 8 characters'}),
  confirmNewPassword: z.string().trim().min(8, {message: 'Password must be at least 8 characters'}),
})
.refine((data) => data.newPassword === data.confirmNewPassword, {
  path: ['confirmNewPassword'],
  message: 'Password and confirm password does not match'
})

type ValidationSchemaType = z.infer<typeof schema>;



const ChangePasswordPanel = () => {

  const {currentUser, isLoading,fetchUser} = useUser()
  const [enableButton, setEnableButton] = useState<boolean>(true)
  const [isOldPassWrong, setOldPassWrong] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors } } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
    await fetchUser();
    if (!currentUser) {
        return;
    }
    setEnableButton(false)
    setOldPassWrong(false)
    try {
      const result = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/" + currentUser?.id + "/password",{
        method : "PUT",
        credentials : 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({oldPassword: data.oldPassword, newPassword: data.newPassword})
      })
      if (result.ok) {
        document.location = '/settings/account'
      }
      else {
        setOldPassWrong(true)
        setEnableButton(true)
      }
      
    }
    catch {
      setEnableButton(true)
    }
  }


  return (
    <div className="flex flex-col w-full gap-3">
        <div className="border-b border-slate-300 my-2 font-bold text-left">Change Password</div>
        <div className="text-sm w-full text-left">Your new password must be at least 8 characters</div>
        <form className="flex flex-col " onSubmit = {handleSubmit(onSubmit)} >
            <TextInput 
                type="password" 
                name="oldPassword" 
                fieldName="Old Password" 
                placeholder="Old Password..." 
                register={register} 
                error={errors.oldPassword} 
            />
            {
                isOldPassWrong && <span className="label-text-alt text-red-700 text-left pl-1 pb-2">The password is wrong</span>
            }

            <TextInput 
                type="password" 
                name="newPassword" 
                fieldName="New Password" 
                placeholder="New Password..." 
                register={register} 
                error={errors.newPassword} 
            />

            <TextInput 
                type="password" 
                name="confirmNewPassword" 
                fieldName="Confirm New Password" 
                placeholder="Confirm New Password..." 
                register={register} 
                error={errors.confirmNewPassword} 
            />

            <div className="w-full flex justify-start">
              <button 
                type="submit"
                className="primary-button" 
                >
                Change password
              </button>
            </div>
        </form>
        
    </div>
  )
}

export default ChangePasswordPanel