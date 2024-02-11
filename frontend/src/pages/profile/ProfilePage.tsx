import { Link, useNavigate } from "react-router-dom";
import UserPanel from "../../components/Profile/UserPanel";
import { useUser } from "../../lib/context/UserContext";
import { useEffect, useState } from "react";
import { UserInfo } from "../../lib/type/UserHidden";
import FormPanel from "../../components/Profile/FormPanel";


const initUser : UserInfo = {
    displayName : "Fallback",
    firstName : "Fallback",
    lastName : "Fallback",
    phoneNumber : "Fallback",
    email : "Fallback@Fallback.com",
    birthdate : new Date(),
    gender : "Other",
    role : "Customer",
    imageURL : "https://utfs.io/f/4a65c7f9-7bb1-4498-99bb-4148be482108-t9vzc5.png",
    isVerified : true,
};

export default function ProfilePage(){

    const {currentUser,isLoading,fetchUser} = useUser();
    const navigate = useNavigate();
    const [isEdit,setEdit] = useState(false);
   // const [userInterface,setUserInterface] = useState(initUser);

    useEffect(() => {
        //called if user is not login  
        const redirect = async ()=> {
            const res = await fetchUser();
            if (!res)
                navigate("/",{replace : true});
        }
        redirect();
    },[]);
    /*
    useEffect(() => {
        if (!isLoading && currentUser !== null)
            setUserInterface(currentUser);
    },[isLoading]);
    */
    
    if(!currentUser) return <div className="page justify-center">Loading..</div>

    
    return (
    <div className="page justify-center bg-indigo-50">
        <div className="border-2 border-blue-200 rounded-lg flex flex-col w-3/4 from-sky-300 to-red-300 bg-gradient-to-b">
            {(!isEdit) && <UserPanel currentUser = {currentUser}/>}
            {(isEdit) && <FormPanel currentUser = {currentUser} fetchUser = {fetchUser} setEdit={setEdit}/>}
            {(!isEdit) && <button className="danger-button" onClick = {() => {setEdit(true); console.log(currentUser)}}>Edit Profile</button>}
            
            {(isEdit) && <button className="danger-button" onClick = {() => {setEdit(false);}}>Cancel Change</button>}
            <Link to ="setting">
                <button className="primary-button w-full">
                    Setting
                </button>
            </Link>
        </div>
    </div>);
} /**/