import { VscAccount } from "react-icons/vsc";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { IoPhonePortraitSharp } from "react-icons/io5";
import { RiCake2Line } from "react-icons/ri";
import { FaTransgenderAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { MdLock } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";

export default function RegisterPage() {
  
  function toRegister(registrationForm:FormData) {
    const firstname = registrationForm.get("firstname")?.toString()
    const lastname = registrationForm.get("lastname")?.toString()
    const displayName = registrationForm.get("displayName")?.toString()
    const phoneNumber = registrationForm.get("phoneNumber")?.toString()
    const birthDate = registrationForm.get("birthDate")?.toString()
    const gender = registrationForm.get("gender")?.toString()
    const email = registrationForm.get("email")?.toString()
    const password = registrationForm.get("password")?.toString()
    const role = registrationForm.get("role")?.toString()
    
    // Just testing
    const registrationInfo = [firstname,lastname,role,displayName,phoneNumber,birthDate,
                              gender,email,password,role]
    console.log(registrationInfo)

    // To implement backend connection
  }
  
  return(
    <div className="flex flex-col items-center h-screen mb-3">
      <div className="mt-8 text-2xl font-bold">Register</div>
      <div className="rounded-xl border border-blue-500 mt-8 h-fit bg-white w-3/5 pb-8">
        <form onSubmit={(e) => { e.preventDefault(); toRegister(new FormData(e.target as HTMLFormElement)); }} className="mx-10 mt-8 flex flex-col items-center">
          <div className="grid grid-cols-2 w-full gap-6 gap-y-10">
            <div className="flex flex-row">
              <VscAccount className='h-6 w-6 place-self-center text-blue-500' />
              <input 
              type="text"
              name="firstname" 
              placeholder="Firstname" 
              className="ml-2 border-0 border-b border-black outline-0 w-full"/>
            </div> 
            <input 
              type="text"
              name="lastname" 
              placeholder="Lastname" 
              className="border-0 border-b border-black outline-0 w-full"/>
            <div className="flex flex-row">
              <MdOutlineSupervisorAccount className='h-6 w-6 place-self-center text-blue-500' />
              <input 
              type="text"
              name="displayName" 
              placeholder="Display name" 
              className="ml-2 border-0 border-b border-black outline-0 w-full"/>
            </div> 
            <div className="flex flex-row">
              <IoPhonePortraitSharp className='h-6 w-6 place-self-center text-blue-500' />
              <input 
              type="text"
              name="phoneNumber" 
              placeholder="Phone number" 
              className="ml-2 border-0 border-b border-black outline-0 w-full"/>
            </div>
            <div className="flex flex-row">
              <RiCake2Line className='h-6 w-6 place-self-center text-blue-500' />
              <input 
              type="date"
              name="birthDate" 
              placeholder="Birthdate"
              className="ml-2 border-0 border-b border-black outline-0 w-full"/>
            </div> 
            <div className="flex flex-row">
              <FaTransgenderAlt className='h-6 w-6 place-self-center text-blue-500' />
              <div className="ml-4 w-full flex gap-4">
                <div className="hover:cursor-pointer flex items-center">
                  <input 
                    type="radio"
                    name="gender"
                    id="Male"  
                    className="accent-blue-500 h-4 w-4 hover:cursor-pointer"/>
                  <label htmlFor="Male" className="text-sm font-medium ml-2 hover:cursor-pointer">Male</label> 
                </div>
                <div className="hover:cursor-pointer flex items-center">
                  <input 
                    type="radio"
                    name="gender"
                    id="Female" 
                    className="accent-blue-500 h-4 w-4 hover:cursor-pointer"/>
                  <label htmlFor="Female" className="text-sm font-medium ml-2 hover:cursor-pointer">Female</label>
                </div>
                <div className="hover:cursor-pointer flex items-center">
                  <input 
                    type="radio"
                    name="gender"
                    id="Other" 
                    className="accent-blue-500 h-4 w-4"/>
                  <label htmlFor="Other" className="text-sm font-medium ml-2 hover:cursor-pointer">Other</label>
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <IoIosMail className='h-6 w-6 place-self-center text-blue-500' />
              <input 
              type="text"
              name="email" 
              placeholder="Email address" 
              className="ml-2 border-0 border-b border-black outline-0 w-full"/>
            </div>
            <div className="flex flex-row">
              <MdLock className='h-6 w-6 place-self-center text-blue-500' />
              <input 
              type="password"
              name="password" 
              placeholder="Password" 
              className="ml-2 border-0 border-b border-black outline-0 w-full"/>
            </div>
            <div className="flex flex-row">
              <MdManageAccounts className='h-6 w-6 place-self-center text-blue-500' />
              <div className="ml-4 w-full flex gap-4">
                <div className="hover:cursor-pointer flex items-center">
                  <input 
                    type="radio"
                    name="role"
                    id="customer"
                    value="Customer" 
                    className="accent-blue-500 h-4 w-4 hover:cursor-pointer"/>
                  <label htmlFor="customer" className="text-sm font-medium ml-2 hover:cursor-pointer">Customer</label> 
                </div>
                <div className="hover:cursor-pointer flex items-center">
                  <input 
                    type="radio"
                    name="role"
                    id="provider"
                    value="Provider" 
                    className="accent-blue-500 h-4 w-4 hover:cursor-pointer"/>
                  <label htmlFor="provider" className="text-sm font-medium ml-2 hover:cursor-pointer">Provider</label>
                </div>
              </div>
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