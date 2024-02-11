import { createContext, useContext, useEffect, useState } from "react";
import { UserInfo } from "../type/UserHidden";
import getUser from "../getUser";

export const UserContext = createContext<{currentUser : UserInfo | null ,fetchUser : () => Promise<boolean>, isLoading: boolean}>({currentUser : null , fetchUser : async () => {return false;}, isLoading: true});

export const UserProvider = ({children} : {children : React.ReactNode}) => {
    const [currentUser,setCurrentUser] = useState<UserInfo | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true)

    const fetchUser = async() => {
        const user : UserInfo | null = await getUser();
        setCurrentUser(user);
        setLoading(false)
        if (!user) return false;
        return true;
    };
    
    useEffect(() => {
        fetchUser();
    },[]);
    
    return (<UserContext.Provider value = {{currentUser, fetchUser, isLoading}}>
        {children}
    </UserContext.Provider>);
};

export const useUser = () => {return useContext(UserContext)};

