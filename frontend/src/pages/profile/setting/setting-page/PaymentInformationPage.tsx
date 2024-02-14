import PaymentMethodPanel from "../../../../components/Setting/paymentInformation/PaymentMethodPanel";
import { SettingContextType } from "../SettingLayout";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export default function PaymentInformationPage(){

    const {currentUser,isLoading,fetchUser} = useOutletContext<SettingContextType>();

    useEffect(() => {
        fetchUser()
    },[]);

    return (
        <div className="w-full flex flex-col gap-5">
            <PaymentMethodPanel />
        </div>
    );
}