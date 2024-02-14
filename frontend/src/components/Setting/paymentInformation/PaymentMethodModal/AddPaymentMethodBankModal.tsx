import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import BankAccountInput from '../../../Form/BankAccountInput';
import TextInput from '../../../Form/TextInput';
import { useUser } from '../../../../lib/context/UserContext';

const schema = z.object({
  bankName: z.string().min(1, {message: "Select bank"}),
  bankAccountNumber: z.string().refine((value) => /[0-9]{10}/.test(value), {message: 'Please fill valid number'})
})

type ValidationSchemaType = z.infer<typeof schema>;

const AddPaymentMethodBankModal = ({addFunction}: {addFunction: (bankName: string, bankAccountNumber: string) => Promise<boolean>}) => {

  const [isError, setError] = useState<boolean>(false)

  const {fetchUser} = useUser();

  const { register, handleSubmit,reset, formState: { errors } } = useForm<Omit<ValidationSchemaType,"birthdate"> & {birthdate : string}>({
    resolver: zodResolver(schema),
  });

  const onSubmit : SubmitHandler<Omit<ValidationSchemaType,"birthdate">> = async (data) => {
    await fetchUser();
    setError(false)
      const boolRes: boolean = await addFunction(data.bankName, data.bankAccountNumber)
    if (!boolRes) {
      setError(true)
    }
  }

  return (
    <>
        <button className="primary-button" onClick={()=>{
            if (document) {
                (document.getElementById('add_payment_modal_bank') as HTMLFormElement).showModal();
            }
        }}>Add New Method</button>
        <dialog id="add_payment_modal_bank" className="modal">
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg">Adding Method</h3>
            {
              isError && <span className="label-text-alt text-red-700">This method is already added</span>
            }
            <form onSubmit = {handleSubmit(onSubmit)}>
                <BankAccountInput
                    fieldName="Bank"
                    name="bankName"
                    placeholder="Select bank"
                    register={register}
                    error={errors.bankName}
                />
                <TextInput
                    type="text" 
                    name="bankAccountNumber" 
                    fieldName="Account Number" 
                    placeholder="Account Number..." 
                    register={register} 
                    error={errors.bankAccountNumber} 
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

export default AddPaymentMethodBankModal