import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import TextInput from '../../Form/TextInput';
import { useUser } from '../../../lib/context/UserContext';

export default function ChangeEmailPanel() {
  
  const schema = z.object({
    newEmail: z.string().trim().email()
  })
  type ValidationSchemaType = z.infer<typeof schema>;

  const {currentUser, isLoading,fetchUser} = useUser()
  const [isEmailWrong, setEmailWrong] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const { register, handleSubmit, formState: { errors } } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: ValidationSchemaType) {
    await fetchUser();
    if (!currentUser) {
        return;
    }
    setEmailWrong(false)
    try {
      const result = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/" + currentUser?.id + "/email",{
        method : "PUT",
        credentials : 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({ newEmail: data.newEmail, user: currentUser })
      })
      if (result.ok) {
        document.location = '/settings/account'
      }
      else {
        result.text().then((text) => setErrorMessage(text))
        setEmailWrong(true)
      }
      
    }
    catch {
      setEmailWrong(true)
    }
  }

  return (
    <div className="flex flex-col w-full">
        <div className="border-b border-slate-300 my-2 font-bold text-left">Change Email</div>
        <form className="flex flex-col " onSubmit = {handleSubmit(onSubmit)} >

            <TextInput 
                type="text" 
                name="newEmail" 
                fieldName="New Email" 
                placeholder="New Email..." 
                register={register} 
                error={errors.newEmail}
                onChange={()=>{setTimeout(()=>setEmailWrong(false), 10000)}}
            />
            {
                !errors.newEmail && isEmailWrong && <span className="label-text-alt text-red-700 text-left pl-1 pb-2">{errorMessage}</span>
            }

            <div className="w-full flex justify-start">
              <button 
                type="submit"
                className="primary-button" 
                >
                Change email
              </button>
            </div>

        </form>
    </div>
  )
}