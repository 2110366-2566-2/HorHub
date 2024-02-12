import { Avatar } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import LabelProfile from "../../Profile/LabelProfile";
import { UserInfo } from "../../../lib/type/UserHidden";
import { useNavigate } from "react-router-dom";
import TextInput from "../../Form/TextInput";

const schema = z.object({
    firstName: z.string().trim().min(1, {message: 'Fill your first name'}),
    lastName: z.string().trim().min(1, {message: 'Fill your last name'}),
    displayName: z.string().trim().min(1, {message: 'Fill display name'}),
    phoneNumber: z.string().trim().length(10, {message: 'Please fill valid phone number'})
                  .refine((value) => /[0-9]{10}/.test(value), {message: 'Please fill valid phone number'}),
    birthdate: z.coerce.date().refine((data) => data < new Date(), { message: "Future date is not accepted" }),
    gender: z.enum(["Male", "Female", "Other"], {invalid_type_error: 'Gender is not valid, gender must be "Male", "Female", or "Other"'}),
 })

type ValidationSchemaType = z.infer<typeof schema>;

export default function ProfilePanel({currentUser,fetchUser} : {currentUser : UserInfo,fetchUser : () => Promise<boolean>}){
    const { register, handleSubmit,reset, formState: { errors } } = useForm<Omit<ValidationSchemaType,"birthdate"> & {birthdate : string}>({
        resolver: zodResolver(schema),

    });

    const navigate = useNavigate();

    const onSubmit : SubmitHandler<Omit<ValidationSchemaType,"birthdate">> = async (data) => {
        const result = await fetch(process.env.REACT_APP_BACKEND_URL + "/auth/user",{
            method : "PUT",
            credentials : 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(data)
        })


        if(result.ok) {
            const data = await result.json();
            console.log(data);
            await fetchUser();
            navigate('/profile');
        }

        
    };

    useEffect(() => {
        const {birthdate} = currentUser;
        console.log(birthdate.toISOString());
        console.log(errors);
        reset({...currentUser, birthdate : birthdate.toISOString().split('T')[0]})
    },[reset,currentUser]);
    
    return (    <div className="flex flex-col w-full">
                    <div className="border-b border-slate-500 my-2 font-bold">Public Profile</div>
                        <form className="flex flex-col " onSubmit = {handleSubmit(onSubmit)} >  
                            <div className="flex flex-col gap-y-2 w-full items-start gap-3 pb-3">
                                <span className="font-semibold text-sm">Avatar</span>
                                <div className="w-full flex flex-col md:flex-row md:pl-5 justify-start items-center gap-5">
                                    <Avatar className = "block justify-center " src = {currentUser.imageURL} sx = {{width : 100, height : 100}}/>
                                    <button className="primary-button w-fit h-fit" type="button">Upload Avatar</button>
                                </div>
                                
                            </div>
                            <div className="flex flex-col gap-y-2 w-full">
                                <TextInput 
                                    type="text" 
                                    name="displayName" 
                                    fieldName="Display Name" 
                                    placeholder="Display Name..." 
                                    register={register} 
                                    error={errors.displayName} 
                                />

                                <LabelProfile header={"Email Address"} deactiveHover = {true}>
                                    {currentUser.email}
                                </LabelProfile >

                                <TextInput 
                                    type="text" 
                                    name="firstName" 
                                    fieldName="First Name" 
                                    placeholder="First Name..." 
                                    register={register} 
                                    error={errors.firstName} 
                                />

                                <TextInput 
                                    type="text" 
                                    name="lastName" 
                                    fieldName="Last Name" 
                                    placeholder="Last Name..." 
                                    register={register} 
                                    error={errors.lastName} 
                                />

                                <TextInput 
                                    type="date" 
                                    name="birthdate" 
                                    fieldName="Birthdate" 
                                    placeholder="Birthdate..." 
                                    register={register} 
                                    error={errors.birthdate} 
                                />

                                <LabelProfile header={"Gender"} deactiveHover = {true}>
                                <div className="inline-block">
                                    <div className="flex gap-3">
                                        <div className="hover:cursor-pointer flex items-center">
                                            <input 
                                                type="radio"
                                                value="Male"
                                                id="Male"  
                                                className="accent-blue-500 h-4 w-4 hover:cursor-pointer"
                                                {...register('gender')} />
                                            <label htmlFor="Male" className="text-sm font-medium ml-2 hover:cursor-pointer">Male</label> 
                                        </div>
                                        <div className="hover:cursor-pointer flex items-center">
                                            <input 
                                                type="radio"
                                                value="Female"
                                                id="Female" 
                                                className="accent-blue-500 h-4 w-4 hover:cursor-pointer"
                                                {...register('gender')} />
                                            <label htmlFor="Female" className="text-sm font-medium ml-2 hover:cursor-pointer">Female</label>
                                        </div>
                                        <div className="hover:cursor-pointer flex items-center">
                                            <input 
                                                type="radio"
                                                value="Other"
                                                id="Other" 
                                                className="accent-blue-500 h-4 w-4"
                                                {...register('gender')} />
                                            <label htmlFor="Other" className="text-sm font-medium ml-2 hover:cursor-pointer">Other</label>
                                        </div>
                                    </div>
                                </div>
                                </LabelProfile>
                                <LabelProfile header={"Role"} deactiveHover = {true}>
                                    {currentUser.role}
                                </LabelProfile>
                                <button className="primary-button w-fit" type="submit">Save Profile</button>
                            </div>
                        
                    </form>
                </div>
                );
}