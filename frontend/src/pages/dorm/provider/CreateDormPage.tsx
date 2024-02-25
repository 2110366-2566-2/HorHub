import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import TextInput from '../../../components/Form/TextInput';
import TextAreaInput from '../../../components/Form/TextAreaInput';

const schema = z.object({
    name: z.string().trim().min(1, {message: "Fill dorm name"}).max(100, {message: "Your dorm name must not exceed 100 characters"}),
    description: z.string().trim().min(1, {message: "Fill description"}).max(5000, {message: "Description must not exceed 5000 characters"})
 })

type ValidationSchemaType = z.infer<typeof schema>;

const CreateDormPage = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm<ValidationSchemaType>({
        resolver: zodResolver(schema),
    });
    
    const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
        console.log(data)
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