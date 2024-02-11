import { useOutletContext } from "react-router-dom";
import ProfilePanel from "../../../../components/Setting/profile/ProfilePanel";
import { SettingContextType } from "../SettingLayout";

export default function ProfileSettingPage(){
    const {currentUser,isLoading,fetchUser} = useOutletContext<SettingContextType>();
    return (<ProfilePanel currentUser={currentUser} fetchUser={fetchUser}/>);
}