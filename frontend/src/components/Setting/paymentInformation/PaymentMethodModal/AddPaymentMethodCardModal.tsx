import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import BankAccountInput from '../../../Form/BankAccountInput';
import TextInput from '../../../Form/TextInput';

const schema = z.object({
  cardNumber: z.string().length(16, {message: 'Please fill valid number'}).refine((value) => /[0-9]{16}/.test(value), {message: 'Please fill valid number'}),
  expiryDate: z.string().refine((value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value), {message: 'Please fill valid expiry date'}),
  CVV: z.string().refine((value) => /^\d{3,4}$/.test(value), {message: 'Please fill valid CVV'})
})

type ValidationSchemaType = z.infer<typeof schema>;

const AddPaymentMethodCardModal = ({addFunction}: {addFunction: (cardNumber: string) => Promise<boolean>}) => {

  const [isError, setError] = useState<boolean>(false)


  const { register, handleSubmit,reset, formState: { errors } } = useForm<Omit<ValidationSchemaType,"birthdate"> & {birthdate : string}>({
    resolver: zodResolver(schema),
  });

  const onSubmit : SubmitHandler<Omit<ValidationSchemaType,"birthdate">> = async (data) => {
    setError(false)
      const boolRes: boolean = await addFunction(data.cardNumber)
    if (!boolRes) {
      setError(true)
    }
  }

  return (
    <>
        <button className="primary-button" onClick={()=>{
            if (document) {
                (document.getElementById('add_payment_modal_card') as HTMLFormElement).showModal();
            }
        }}>Add New Method</button>
        <dialog id="add_payment_modal_card" className="modal">
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg">Adding Method</h3>
            {
              isError && <span className="label-text-alt text-red-700">This method is already added</span>
            }
            <form onSubmit = {handleSubmit(onSubmit)}>
                <TextInput
                    type="text" 
                    name="cardNumber" 
                    fieldName="Card Number" 
                    placeholder="XXXXXXXXXXXXXXXX" 
                    register={register} 
                    error={errors.cardNumber} 
                />
                <TextInput
                    type="text" 
                    name="expiryDate" 
                    fieldName="Expiry Date" 
                    placeholder="MM/YY" 
                    register={register} 
                    error={errors.expiryDate} 
                />
                <TextInput
                    type="text" 
                    name="CVV" 
                    fieldName="CVV" 
                    placeholder="XXX" 
                    register={register} 
                    error={errors.CVV} 
                />
              <button className="primary-button w-fit h-fit" type="submit">Create</button>
            </form>
            <div className="w-full flex justify-center gap-2">
              
            </div>
          </div>
          
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
    </>
  )
}

export default AddPaymentMethodCardModal