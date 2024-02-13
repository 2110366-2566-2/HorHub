import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod'
import TextInput from '../../../Form/TextInput';
import BankAccountInput from '../../../Form/BankAccountInput';

const schema = z.object({
    bankName: z.string().min(1, {message: "Select bank"}),
    bankAccountNumber: z.string().length(10, {message: "Your bank account number isn't valid"})
 })

 type ValidationSchemaType = z.infer<typeof schema>;

const ProviderPaymentMethod = () => {
    const { register, handleSubmit,reset, formState: { errors } } = useForm<Omit<ValidationSchemaType,"birthdate"> & {birthdate : string}>({
        resolver: zodResolver(schema),

    });

    const onSubmit : SubmitHandler<Omit<ValidationSchemaType,"birthdate">> = async (data) => {
        console.log(data)
    }
    
    return (
        <form className="flex flex-col" onSubmit = {handleSubmit(onSubmit)} >
            <div className="flex flex-row gap-5">
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
            </div>
            
            <button className="primary-button w-fit h-fit" type="submit">Save</button>
        </form>
    )
}

export default ProviderPaymentMethod