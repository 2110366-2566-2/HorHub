import { IoPersonCircleOutline } from "react-icons/io5";
import ListSettingItem from "./ListSettingItem";
import { GoGear } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";

export default function SettingSidebar(){
    //inside li should be link 
    const location = useLocation();
    const currentPath = location.pathname.split('profile/setting/')[1];
    return (
    <nav className="bg-gradient-to-b from-sky-50 to-blue-300 w-2/4 md:w-1/4 h-[75vh]">
        <ul className="grid grid-cols-1">
            <Link to = "profile">   
                <ListSettingItem active = {currentPath === "profile"}>
                    <IoPersonCircleOutline />
                    <div>Public Profile</div>
                </ListSettingItem>
            </Link>
            <Link to = "account">
                <ListSettingItem active = {currentPath === "account"}>
                    <GoGear />
                    <div>Account</div>
                </ListSettingItem>
            </Link>
            <Link to = "password">
                <ListSettingItem active = {currentPath === "password"}>
                    <RiLockPasswordFill />
                    <div>Change Password</div>
                </ListSettingItem>
            </Link>
            <ListSettingItem >
                <div>Public Profile</div>
            </ListSettingItem>
            <ListSettingItem >
                <div>Public Profile</div>
            </ListSettingItem>
            <ListSettingItem >
                <div>Public Profile</div>
            </ListSettingItem>
        </ul>
    </nav>);
}   