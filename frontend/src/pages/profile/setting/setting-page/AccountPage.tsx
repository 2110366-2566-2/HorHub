import ChangeEmailPanel from "../../../../components/Setting/account/ChangeEmailPanel";
import ChangePasswordPanel from "../../../../components/Setting/account/ChangePasswordPanel";

export default function AccountPage(){
    return (
        <div className="w-full flex flex-col gap-5">
            <ChangeEmailPanel />
            <ChangePasswordPanel />
        </div>
    );
}