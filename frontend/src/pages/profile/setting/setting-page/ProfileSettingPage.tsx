import ProfilePanel from "../../../../components/Setting/profile/ProfilePanel";
import { SettingContextType } from "../SettingLayout";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function ProfileSettingPage(){
    const {currentUser,isLoading,fetchUser} = useOutletContext<SettingContextType>();
    useEffect(() => {
        fetchUser()
    },[]);

    return (<ProfilePanel currentUser={currentUser} fetchUser={fetchUser}/>);
}