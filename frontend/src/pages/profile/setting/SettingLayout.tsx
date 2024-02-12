import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../../components/Setting/Header"
import SettingSidebar from "../../../components/Setting/SettingSidebar"
import LoadingPage from "../../etc/LoadingPage";
import { useUser } from "../../../lib/context/UserContext";
import { useEffect } from "react";
import { UserInfo } from "../../../lib/type/UserHidden";

export type SettingContextType = {currentUser : UserInfo,
                           isLoading : boolean,
                           fetchUser : () => Promise<boolean>};

export default function SettingLayout(){
    const {currentUser,isLoading,fetchUser} = useUser();
    const navigate = useNavigate();
    useEffect( ()=> {
        document.title = 'Settings | HorHub'
        const redirect = async ()=> {
            const res = await fetchUser();
            if (!res)
                navigate("/",{replace : true});
        }
        redirect();
    },[]);

    if (isLoading || !currentUser) return (<LoadingPage/>);

    return (
    <div className="page gap-3">
        <Header currentUser={currentUser}/>
        <div className= "flex-row flex w-full gap-2">
            <SettingSidebar></SettingSidebar>
            <div className="text-center text-lg w-full">
                <Outlet context = {{currentUser, isLoading, fetchUser}}/>
            </div>
            
        </div>
    </div>)
}