import { createContext, useContext, useEffect, useState } from "react";
import { UserInfo } from "../type/UserHidden";
import getUser from "../getUser";

export const UserContext = createContext<{currentUser : UserInfo | null ,fetchUser : () => Promise<boolean>}>({currentUser : null , fetchUser : async () => {return false;}});

export const UserProvider = ({children} : {children : React.ReactNode}) => {
    const [currentUser,setCurrentUser] = useState<UserInfo | null>(null);

    const fetchUser = async() => {
        const user : UserInfo | null = await getUser();
        setCurrentUser(user);
        if (!user) return false;
        return true;
    };
    
    useEffect(() => {
        fetchUser();
    },[]);
    
    return (<UserContext.Provider value = {{currentUser,fetchUser}}>
        {children}
    </UserContext.Provider>);
};

export const useUser = () => {return useContext(UserContext)};

