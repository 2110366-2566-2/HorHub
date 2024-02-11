import { UserInfo, UserInfoSchema } from "./type/UserHidden";


export default async function getUser() : Promise<UserInfo | null>{
    try{
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
    }
    catch (err) {
        return null;
    }
    
    return null;
    
}
