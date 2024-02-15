import ChangeEmailPanel from "../../../../components/Setting/account/ChangeEmailPanel";
import ChangePasswordPanel from "../../../../components/Setting/account/ChangePasswordPanel";
import DeleteAccountPanel from "../../../../components/Setting/account/DeleteAccountPanel";
import { SettingContextType } from "../SettingLayout";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function AccountPage(){

    const {currentUser,isLoading,fetchUser} = useOutletContext<SettingContextType>();
    useEffect(() => {
        fetchUser()
    },[]);

    return (
        <div className="w-full flex flex-col gap-5">
            {/* <ChangeEmailPanel /> */}
            <ChangePasswordPanel />
            <DeleteAccountPanel />
        </div>
    );
}