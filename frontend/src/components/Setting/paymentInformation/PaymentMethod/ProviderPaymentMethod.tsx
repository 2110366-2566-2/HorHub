import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod'
import TextInput from '../../../Form/TextInput';
import BankAccountInput from '../../../Form/BankAccountInput';
import { useUser } from '../../../../lib/context/UserContext';

const schema = z.object({
    bankName: z.string().min(1, {message: "Select bank"}),
    bankAccountNumber: z.string().refine((value) => /[0-9]{10}/.test(value), {message: 'Please fill valid number'})
 })

 type ValidationSchemaType = z.infer<typeof schema>;

const ProviderPaymentMethod = () => {
    const {currentUser} = useUser()

    const [enableButton, setEnableButton] = useState<boolean>(false)

    const { register, handleSubmit,reset, formState: { errors } } = useForm<Omit<ValidationSchemaType,"birthdate"> & {birthdate : string}>({
        resolver: zodResolver(schema),

    });

    const onSubmit : SubmitHandler<Omit<ValidationSchemaType,"birthdate">> = async (data) => {
        setEnableButton(false)
        console.log(data)
        if (!currentUser) {
            setEnableButton(true)
            return
        }
        const paymentRes = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/" + currentUser.id + "/paymentMethods", {
            method: "GET"
        })
        const paymentData = await paymentRes.json()

        if (!paymentData[0]) {
            const createPaymentRes = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/" + currentUser.id + "/paymentMethods", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({type: "Bank", info: `${data.bankName}-${data.bankAccountNumber}`})
            })

            if (!createPaymentRes.ok) {
                setEnableButton(true)
                return
            }

            document.location = "/settings/payment_information"

        }
        else {
            const updatePaymentRes = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/" + currentUser.id + "/paymentMethods/" + paymentData[0].id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify({type: "Bank", info: `${data.bankName}-${data.bankAccountNumber}`})
            })

            if (!updatePaymentRes.ok) {
                setEnableButton(true)
                return
            }
            document.location = "/settings/payment_information"
        }
        
    }

    async function initData() {
        if (!currentUser) {
            return
        }
        const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/users/" + currentUser.id + "/paymentMethods", {
            method: "GET"
        })
        const data = await res.json()
        console.log(data)
        reset({bankName: data[0].info.split('-')[0], bankAccountNumber: data[0].info.split('-')[1]})
        setEnableButton(true)
    }

    useEffect(() => {
        initData()
    }, [currentUser])
    
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
            {
                enableButton ? <button className="primary-button w-fit h-fit" type="submit">Save</button>
                : <button className="disabled-button w-fit h-fit" disabled>Save</button>
            }
            
        </form>
    )
}

export default ProviderPaymentMethod