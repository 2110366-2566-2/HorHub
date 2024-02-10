import { VscAccount } from "react-icons/vsc";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { IoPhonePortraitSharp } from "react-icons/io5";
import { RiCake2Line } from "react-icons/ri";
import { FaTransgenderAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { MdLock } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8, {message: 'Password must be at least 8 characters'}),
  confirmPassword: z.string().trim().min(8, {message: 'Password must be at least 8 characters'}),
  firstName: z.string().trim().min(1, {message: 'Fill your first name'}),
  lastName: z.string().trim().min(1, {message: 'Fill your last name'}),
  displayName: z.string().trim().min(1, {message: 'Fill display name'}),
  phoneNumber: z.string().trim().length(10, {message: 'Please fill valid phone number'})
                .refine((value) => /[0-9]{10}/.test(value), {message: 'Please fill valid phone number'}),
  birthDate: z.coerce.date().refine((data) => data < new Date(), { message: "Future date is not accepted" }),
  gender: z.enum(["Male", "Female", "Other"], {invalid_type_error: 'Gender is not valid, gender must be "Male", "Female", or "Other"'}),
  role: z.enum(["Customer", "Provider"], {invalid_type_error: 'Role is not valid, role must be "Customer" or "Provider"'})
})
.refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Password and confirm password does not match'
})

type ValidationSchemaType = z.infer<typeof schema>;

export default function RegisterPage() {


  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
    console.log(data)
    const result = await fetch(process.env.REACT_APP_BACKEND_URL + "/auth/register",{
      method : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(data),
      credentials : 'include',
    });
    if (result.status === 201){
      const res = await result.json();
      console.log(res.token);
      navigate("../",{replace : true});
    }
    
    
  }
  
  return(
    <div className="page">
      <div className="text-2xl font-bold">Register</div>
      <div className="rounded-xl border border-blue-500 mt-8 h-fit bg-white w-full md:w-4/5 lg:w-3/5 pb-8 text-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="mx-10 mt-8 flex flex-col items-center gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6 gap-y-10">

            <div className="w-full lg:col-span-2">
              <span className="font-bold text-base">Authentication Information</span>
            </div>

            <div className="relative flex flex-row lg:col-span-2">
              <IoIosMail className='h-6 w-6 place-self-center text-blue-500' />
              <input 
              type="text"
              placeholder="Email address" 
              className={`ml-2 border-0 border-b outline-0 w-full ${errors.email ? "border-red-700" : "border-black"}`}
              {...register('email')} />
              {
                errors.email && <div className="absolute pl-8 -bottom-1 translate-y-full text-red-700">{errors.email.message}</div>
              }
            </div>

            <div className="relative flex flex-row">
              <MdLock className='h-6 w-6 place-self-center text-blue-500' />
              <input 
              type="password"
              placeholder="Password" 
              className={`ml-2 border-0 border-b outline-0 w-full ${errors.password ? "border-red-700" : "border-black"}`}
              {...register('password')} />
              {
                errors.password && <div className="absolute pl-8 -bottom-1 translate-y-full text-red-700">{errors.password.message}</div>
              }
            </div>

            <div className="relative flex flex-row">
              <MdLock className='h-6 w-6 place-self-center text-blue-500' />
              <input 
              type="password"
              placeholder="Confirm Password" 
              className={`ml-2 border-0 border-b outline-0 w-full ${errors.confirmPassword ? "border-red-700" : "border-black"}`}
              {...register('confirmPassword')} />
              {
                errors.confirmPassword && <div className="absolute pl-8 -bottom-1 translate-y-full text-red-700">{errors.confirmPassword.message}</div>
              }
            </div>

            <div className="w-full lg:col-span-2">
              <span className="font-bold text-base">Account Information</span>
            </div>

            <div className="relative flex flex-row lg:col-span-2">
              <VscAccount className='h-6 w-6 place-self-center text-blue-500' />
              <input 
              type="text"
              placeholder="First Name" 
              className={`ml-2 border-0 border-b outline-0 w-1/2 ${(errors.firstName || errors.lastName) ? "border-red-700" : "border-black"}`}
              {...register('firstName')} />
              <input 
              type="text"
              placeholder="Last Name" 
              className={`ml-2 border-0 border-b outline-0 w-1/2 ${(errors.firstName || errors.lastName) ? "border-red-700" : "border-black"}`}
              {...register('lastName')} />
              {
                (errors.firstName || errors.lastName) && <div className="absolute pl-8 -bottom-1 translate-y-full text-red-700">Please fill both first and last name</div>
              }
            </div> 

            <div className="relative flex flex-row">
              <MdOutlineSupervisorAccount className='h-6 w-6 place-self-center text-blue-500' />
              <input 
              type="text"
              placeholder="Display Name" 
              className={`ml-2 border-0 border-b outline-0 w-full ${errors.displayName ? "border-red-700" : "border-black"}`}
              {...register('displayName')} />
              {
                errors.displayName && <div className="absolute pl-8 -bottom-1 translate-y-full text-red-700">{errors.displayName.message}</div>
              }
            </div> 

            <div className="relative flex flex-row">
              <IoPhonePortraitSharp className='h-6 w-6 place-self-center text-blue-500' />
              <input 
              type="tel"
              placeholder="Phone Number" 
              className={`ml-2 border-0 border-b outline-0 w-full ${errors.phoneNumber ? "border-red-700" : "border-black"}`}
              {...register('phoneNumber')} />
              {
                errors.phoneNumber && <div className="absolute pl-8 -bottom-1 translate-y-full text-red-700">{errors.phoneNumber.message}</div>
              }
            </div>
            
            <div className="relative flex flex-row">
              <RiCake2Line className='h-6 w-6 place-self-center text-blue-500' />
              <input 
              type="date"
              placeholder="Birthdate"
              className={`ml-2 border-0 border-b outline-0 w-full ${errors.birthDate ? "border-red-700" : "border-black"}`}
              {...register('birthDate')} />
              {
                errors.birthDate && <div className="absolute pl-8 -bottom-1 translate-y-full text-red-700">{errors.birthDate.message}</div>
              }
            </div> 

            <div className="relative flex flex-row">
              <FaTransgenderAlt className='h-6 w-6 place-self-center text-blue-500' />
              <div className="ml-4 w-full flex gap-4">
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
              {
                errors.gender && <div className="absolute pl-8 -bottom-1 translate-y-full text-red-700">Please select gender</div>
              }
            </div>

            <div className="relative flex flex-row">
              <MdManageAccounts className='h-6 w-6 place-self-center text-blue-500' />
              <div className="ml-4 w-full flex gap-4">
                <div className="hover:cursor-pointer flex items-center">
                  <input 
                    type="radio"
                    id="customer"
                    value="Customer" 
                    className="accent-blue-500 h-4 w-4 hover:cursor-pointer"
                    {...register('role')} />
                  <label htmlFor="customer" className="text-sm font-medium ml-2 hover:cursor-pointer">Customer</label> 
                </div>
                <div className="hover:cursor-pointer flex items-center">
                  <input 
                    type="radio"
                    id="provider"
                    value="Provider" 
                    className="accent-blue-500 h-4 w-4 hover:cursor-pointer"
                    {...register('role')} />
                  <label htmlFor="provider" className="text-sm font-medium ml-2 hover:cursor-pointer">Provider</label>
                </div>
              </div>
              {
                errors.role && <div className="absolute pl-8 -bottom-1 translate-y-full text-red-700">Please select your account role</div>
              }
            </div>
            
          </div>
          <button type="submit" className="primary-button">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}