import { UserInfo, UserInfoSchema } from "./type/UserHidden";


export default async function getUser() : Promise<UserInfo | null>{
    const jwt = await fetch(process.env.REACT_APP_BACKEND_URL + "/auth/user",{
            method : "GET",
            credentials : "include"
        })
        if (jwt.status === 200){
            const data = await jwt.json();
            
            const user_data = UserInfoSchema.safeParse(data);
            if(!user_data.success) return null;
    
            return user_data.data;
        }
        if (jwt.status === 401){
            console.log(jwt);
            console.log("NOT OK");
        }
    
    
    
    return null;
    
}
