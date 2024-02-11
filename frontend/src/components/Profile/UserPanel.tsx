import { Avatar } from "@mui/material";
import { UserInfo } from "../../lib/type/UserHidden";
import LabelProfile from "./LabelProfile";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";



export default function UserPanel({currentUser} : {currentUser : UserInfo}){

      

        return (
        <div className="flex flex-col items-center w-[100%]">
            <div className="font-bold text-lg">{currentUser.displayName}</div>
            <Avatar className = " block justify-center" src = {currentUser.imageURL} sx = {{width : 100, height : 100}}/>
            <div className="w-full">
                <LabelProfile header={"Email Address"} >{currentUser.email}</LabelProfile>
                <LabelProfile header={"Full Name"} >{currentUser.firstName + " " + currentUser.lastName}</LabelProfile>
                <LabelProfile header={"Phone Number"} >{currentUser.phoneNumber}</LabelProfile>
                <LabelProfile header={"Birth Date"} >{currentUser.birthdate.toISOString().split('T')[0]}</LabelProfile>
                <LabelProfile header={"Gender"} >{currentUser.gender}</LabelProfile>
                <LabelProfile header={"Role"} >{currentUser.role}</LabelProfile>
                <LabelProfile header={"Verified"} >{(currentUser.isVerified) ? "✅" : "❎"}</LabelProfile>
            </div>
        </div>);
}

/*
*/