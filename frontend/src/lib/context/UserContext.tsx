import { createContext, useContext, useEffect, useState } from "react";
import { UserInfo } from "../type/UserHidden";
import getUser from "../getUser";

export const UserContext = createContext<{currentUser : UserInfo | null ,fetchUser : () => Promise<void>}>({currentUser : null , fetchUser : async () => {}});

export const UserProvider = ({children} : {children : React.ReactNode}) => {
    const [currentUser,setCurrentUser] = useState<UserInfo | null>(null);

    const fetchUser = async() => {
        const user : UserInfo | null = await getUser();
        setCurrentUser(user);
    };
    
    useEffect(() => {
        fetchUser();
    },[]);
    
    return (<UserContext.Provider value = {{currentUser,fetchUser}}>
        {children}
    </UserContext.Provider>);
};

export const useUser = () => {return useContext(UserContext)};

