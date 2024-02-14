import EmailPanel from "../../../../components/Setting/email/EmailPanel";
import { SettingContextType } from "../SettingLayout";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function EmailChangePage(){

    const {currentUser,isLoading,fetchUser} = useOutletContext<SettingContextType>();
    useEffect(() => {
        fetchUser()
    },[]);

    return (<EmailPanel />);
}
