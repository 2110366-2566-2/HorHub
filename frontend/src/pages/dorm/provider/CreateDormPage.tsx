import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import TextInput from '../../../components/Form/TextInput';
import TextAreaInput from '../../../components/Form/TextAreaInput';
import { useUser } from '../../../lib/context/UserContext';
import LoadingPage from '../../etc/LoadingPage';

const schema = z.object({
    name: z.string().trim().min(1, {message: "Fill dorm name"}).max(100, {message: "Your dorm name must not exceed 100 characters"}),
    description: z.string().trim().min(1, {message: "Fill description"}).max(5000, {message: "Description must not exceed 5000 characters"}),
    address: z.string().trim().min(1, {message: "Fill dorm address"}).max(300, {message: "Address must not exceed 300 characters"}),
    latitude: z.coerce.number().min(-90.00000, {message: "The value must be between -90.00000 to 90.00000"}).max(90.00000, {message: "The value must be between -90.00000 to 90.00000"}),
    longitude: z.coerce.number().min(-180.00000, {message: "The value must be between -180.00000 to 180.00000"}).max(180.00000, {message: "The value must be between -180.00000 to 180.00000"}),
})

type ValidationSchemaType = z.infer<typeof schema>;

const CreateDormPage = () => {

    const {currentUser, isLoading} = useUser()
    
    const { register, handleSubmit, formState: { errors } } = useForm<ValidationSchemaType>({
        resolver: zodResolver(schema),
        mode: 'all'
    });
    
    const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
        console.log(data)
    }

    if (isLoading) {
        return <LoadingPage />
    }


    return (
    <div className="page">
        <div className="w-full flex flex-col">
        <div className="border-b border-slate-300 my-2 font-bold text-left">Creating Dorm</div>
        <div className="text-sm w-full text-left">Please fill the following information to create dorm in the platform</div>
        <form className="flex flex-col " onSubmit = {handleSubmit(onSubmit)} >
            <TextInput 
                type="text" 
                name="name" 
                fieldName="Dorm Name" 
                placeholder="Name..." 
                register={register} 
                error={errors.name} 
            />

            <TextAreaInput 
                name="description" 
                fieldName="Description" 
                placeholder="Fill your dorm description here" 
                register={register} 
                error={errors.description} 
            />

            <div className="border-b border-slate-300 my-2 font-bold text-left">Location</div>

            <TextInput 
                type="text" 
                name="address" 
                fieldName="Address" 
                placeholder="Address..." 
                register={register} 
                error={errors.address} 
            />

            <div className="flex gap-3">
                <div className="w-40">
                    <TextInput 
                        type="number" 
                        name="latitude" 
                        fieldName="Latitude" 
                        placeholder="0.00000" 
                        register={register} 
                        error={errors.latitude} 
                    />
                </div>
                <div className="w-40">
                    <TextInput 
                        type="number" 
                        name="longitude" 
                        fieldName="Longitude" 
                        placeholder="0.00000" 
                        register={register} 
                        error={errors.longitude} 
                    />
                </div>
            </div>

            <div className="w-full flex justify-start">
              <button 
                type="submit"
                className="primary-button" 
                >
                Create Dorm
              </button>
            </div>
        </form>
        </div>
        
    </div>
    )
}

export default CreateDormPage