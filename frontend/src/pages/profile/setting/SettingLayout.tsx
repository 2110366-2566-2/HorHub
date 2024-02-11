import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../../components/Setting/Header"
import SettingSidebar from "../../../components/Setting/SettingSidebar"
import LoadingPage from "../../etc/LoadingPage";
import { useUser } from "../../../lib/context/UserContext";
import { useEffect } from "react";

export default function SettingLayout(){
    const {currentUser,isLoading,fetchUser} = useUser();
    const navigate = useNavigate();
    useEffect( ()=> {
        const redirect = async ()=> {
            const res = await fetchUser();
            if (!res)
                navigate("/",{replace : true});
        }
        redirect();
    },[]);

    if (isLoading || !currentUser) return (<LoadingPage/>);

    return (
    <div className="page  bg-indigo-50">
        <Header currentUser={currentUser}/>
        <div className= "flex-row flex w-3/4">
            <SettingSidebar></SettingSidebar>
            <div className="text-center text-lg font-bold">
                <Outlet />
            </div>
            
        </div>
    </div>)
}