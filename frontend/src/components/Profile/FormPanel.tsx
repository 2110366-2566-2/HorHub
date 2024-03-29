import { Avatar } from "@mui/material";
import { UserInfo } from "../../lib/type/UserHidden";
import LabelProfile from "./LabelProfile";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

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

export default function FormPanel({currentUser,fetchUser,setEdit} : {currentUser : UserInfo,fetchUser : () => Promise<boolean>,setEdit : (value : boolean) => void}){
    const { register, handleSubmit,reset, formState: { errors } } = useForm<Omit<ValidationSchemaType,"birthdate"> & {birthdate : string}>({
        resolver: zodResolver(schema),

    });

    const onSubmit : SubmitHandler<Omit<ValidationSchemaType,"birthdate">> = async (data) => {
        const result = await fetch(process.env.REACT_APP_BACKEND_URL + "/auth/user",{
            method : "PUT",
            credentials : 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(data)
        })

        console.log(result);

        if(result.ok) {
            const data = await result.json();
            console.log(data);
            await fetchUser();
            setEdit(false);
        }

        
    };

    useEffect(() => {
        const {birthdate} = currentUser;
        console.log(birthdate.toISOString());
        console.log(errors);
        reset({...currentUser, birthdate : birthdate.toISOString().split('T')[0]})
    },[reset,currentUser]);
    
    return (
                <form className="flex flex-col items-center " onSubmit = {handleSubmit(onSubmit)} > 
                             
                            <div className="font-bold text-lg flex flex-wrap text-center justify-center sm:justify-start sm:flex-nowrap">
                                    <div> Display Name : </div>
                                    <input className = {"w-100% bg-transparent border-2 rounded " + ((errors.displayName) ? "border-red-400"  : "border-blue-400")}{...register("displayName")}></input>
                                    {
                                        errors.displayName && (<div className="text-red-700">{errors.displayName.message}</div>)
                                    }
                            </div>
    
                            <Avatar className = " block justify-center" src = {currentUser.imageURL} sx = {{width : 100, height : 100}}/>
                            <div className="w-full flex flex-col ">
                                <LabelProfile header={"Email Address"} >
                                    {currentUser.email}
                                </LabelProfile>
                                
                                <LabelProfile header={"Full Name"} >
                                    <input className = {"w-100% bg-transparent  border-2 rounded " + ((errors.firstName) ? "border-red-400"  : "border-blue-400")} {...register("firstName")}></input>
                                    {
                                            errors.firstName && (<div className="text-red-700">{errors.firstName.message}</div>)
                                    }
                                    <input className = {"w-100% bg-transparent  border-2 rounded " + ((errors.lastName) ? "border-red-400"  : "border-blue-400")} {...register("lastName")}></input>
                                    {
                                            errors.lastName && (<div className="text-red-700">{errors.lastName.message}</div>)
                                    }
                                </LabelProfile>
                                <LabelProfile header={"Phone Number"} >
                                    <input className = {"w-100% bg-transparent  border-2 rounded " + ((errors.phoneNumber) ? "border-red-400"  : "border-blue-400")} type = "tel" {...register("phoneNumber")}></input>
                                    {
                                            errors.phoneNumber && (<div className="text-red-700">{errors.phoneNumber.message}</div>)
                                    }
                                </LabelProfile>
                                <LabelProfile header={"Birth Date"} >
                                    <input className = {"w-100% bg-transparent  border-2 rounded " + ((errors.birthdate) ? "border-red-400"  : "border-blue-400")} type="date" {...register("birthdate")}></input>
                                    {
                                            errors.birthdate && (<div className="text-red-700">{errors.birthdate.message}</div>)
                                    }
                                </LabelProfile>
                                <LabelProfile header={"Gender"} >
                                <div className="inline-block">
                                    <div className="flex ">
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
                                <LabelProfile header={"Role"} >
                                    {currentUser.role}
                                </LabelProfile>
                                <LabelProfile header={"Verified"} >
                                    {(currentUser.isVerified) ? "✅" : "❎"}
                                </LabelProfile>
                            </div>
                            {<button className="primary-button w-full" type = "submit">Save Profile</button>}
                        </form>
                );
}