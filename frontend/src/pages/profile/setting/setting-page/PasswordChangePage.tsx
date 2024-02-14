import PasswordPanel from "../../../../components/Setting/password/PasswordPanel";
import { SettingContextType } from "../SettingLayout";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function PasswordChangePage(){

    const {currentUser,isLoading,fetchUser} = useOutletContext<SettingContextType>();
    useEffect(() => {
        fetchUser()
    },[]);

    return (<PasswordPanel/>);
}