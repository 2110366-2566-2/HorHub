import { Avatar } from "@mui/material";
import { UserInfo } from "../../lib/type/UserHidden";

export default function UserPanel({currentUser} : {currentUser : UserInfo}){
    const profile_info = Object.keys(currentUser).map(function(key : string) {
        return (!["imageURL","displayName"].includes(key)) ? (<div className="hover:bg-sky-300 transition-colors w-full flex justify-center">
                                                                <div className="w-3/4">
                                                                    {key} : {currentUser[key as keyof UserInfo].toString()}
                                                                </div>
                                                             </div>) : <></>;
    });

    return (
    <div className="flex flex-col items-center">
        <div>{currentUser.displayName}</div>
        <Avatar className = " block justify-center" src = {currentUser.imageURL} sx = {{width : 100, height : 100}}/>
        <div className="w-[100%]">
        {profile_info}
        </div>
    </div>);
}

/*
*/