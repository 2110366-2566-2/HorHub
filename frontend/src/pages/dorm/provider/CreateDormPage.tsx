import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import TextInput from '../../../components/Form/TextInput';

const schema = z.object({
    name: z.string().trim().min(1, {message: "Fill dorm name"}).max(100, {message: "Your dorm name must not exceed 100 characters"})
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
        <form className="flex flex-col " onSubmit = {handleSubmit(onSubmit)} >
            <TextInput 
                type="text" 
                name="name" 
                fieldName="Dorm Name" 
                placeholder="Name..." 
                register={register} 
                error={errors.name} 
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
    )
}

export default CreateDormPage