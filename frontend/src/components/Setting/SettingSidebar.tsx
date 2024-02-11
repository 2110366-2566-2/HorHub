import { IoPersonCircleOutline } from "react-icons/io5";
import ListSettingItem from "./ListSettingItem";
import { GoGear } from "react-icons/go";

export default function SettingSidebar(){
    //inside li should be link 
    
    return (
    <nav className="bg-gradient-to-b from-sky-50 to-blue-300 w-2/4 md:w-1/4 h-[75vh]">
        <ul className="grid grid-cols-1">
            <ListSettingItem active = {true}>
                <IoPersonCircleOutline />
                <div>Public Profile</div>
            </ListSettingItem>
            <ListSettingItem >
                <GoGear />
                <div>Account</div>
            </ListSettingItem>
            <ListSettingItem >
                C
            </ListSettingItem>
            <ListSettingItem >
                D
            </ListSettingItem>
            <ListSettingItem >
                E
            </ListSettingItem>
            <ListSettingItem >
                F
            </ListSettingItem>
        </ul>
    </nav>);
}   