import { Avatar } from "@mui/material";
import { UserInfo } from "../../lib/type/UserHidden";
import LabelProfile from "./LabelProfile";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const schema = z.object({
    email: z.string().trim().email(),
    firstName: z.string().trim().min(1, {message: 'Fill your first name'}),
    lastName: z.string().trim().min(1, {message: 'Fill your last name'}),
    displayName: z.string().trim().min(1, {message: 'Fill display name'}),
    phoneNumber: z.string().trim().length(10, {message: 'Please fill valid phone number'})
                  .refine((value) => /[0-9]{10}/.test(value), {message: 'Please fill valid phone number'}),
    birthdate: z.coerce.date().refine((data) => data < new Date(), { message: "Future date is not accepted" }),
    gender: z.enum(["Male", "Female", "Other"], {invalid_type_error: 'Gender is not valid, gender must be "Male", "Female", or "Other"'}),
 })

type ValidationSchemaType = z.infer<typeof schema>;

export default function FormPanel({currentUser,setEdit} : {currentUser : UserInfo,setEdit : (value : boolean) => void}){
    const { register, handleSubmit,reset, formState: { errors } } = useForm<Omit<ValidationSchemaType,"birthdate"> & {birthdate : string}>({
        resolver: zodResolver(schema),

    });

    useEffect(() => {
        const {birthdate} = currentUser;
        console.log(birthdate.toISOString());
        reset({...currentUser, birthdate : birthdate.toISOString().split('T')[0]})
    },[reset,currentUser]);
    
    console.log(register("birthdate"));
    return (
                        <form className="flex flex-col items-center">
    
                            <div className="font-bold text-lg">
                                    Display Name : <input {...register("displayName")}></input>
                            </div>
    
                            <Avatar className = " block justify-center" src = {currentUser.imageURL} sx = {{width : 100, height : 100}}/>
                            <div className="w-full">
                                <LabelProfile header={"Email Address"} >
                                    <input {...register("email")}></input>
                                </LabelProfile>
                                <LabelProfile header={"Full Name"} >
                                    <input {...register("firstName")}></input>
                                    <input {...register("lastName")}></input>
                                </LabelProfile>
                                <LabelProfile header={"Phone Number"} >
                                    <input type = "tel" {...register("phoneNumber")}></input>
                                </LabelProfile>
                                <LabelProfile header={"Birth Date"} >
                                    <input type="date" {...register("birthdate")}></input>
                                </LabelProfile>
                                <LabelProfile header={"Gender"} >
                                <div className="inline-block">
                                    <div className="flex">
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
                            {<button className="primary-button w-full" onClick = {() => {setEdit(false);}}>Save Profile</button>}
                        </form>
                );
}