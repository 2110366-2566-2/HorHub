import DeletePanel from "../../../../components/Setting/delete/DeletePanel";
import { SettingContextType } from "../SettingLayout";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function DeleteAccountPage(){
    const {currentUser,isLoading,fetchUser} = useOutletContext<SettingContextType>();
    useEffect(() => {
        fetchUser()
    },[]);


    return (<DeletePanel/>);
}