import { createContext, useContext, useEffect, useState } from "react";
import { UserInfo } from "../type/UserHidden";
import getUser from "../getUser";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext<{currentUser : UserInfo | null ,fetchUser : () => Promise<boolean>, isLoading: boolean}>({currentUser : null , fetchUser : async () => {return false;}, isLoading: true});

export const UserProvider = ({children} : {children : React.ReactNode}) => {
    const [currentUser,setCurrentUser] = useState<UserInfo | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true)

    const navigate = useNavigate()

    const fetchUser = async() => {
        try {
            const user : UserInfo | null = await getUser();
            setCurrentUser(user);
            setLoading(false)
            if (!user) return false;
            
            // If not verified
            if (!user.isVerified) {
                navigate('/verify')
            }

            return true;
        }
        catch {
            setLoading(false)
            return false;
        }
        
        



        
    };
    
    useEffect(() => {
        fetchUser();
    },[]);
    
    return (<UserContext.Provider value = {{currentUser, fetchUser, isLoading}}>
        {children}
    </UserContext.Provider>);
};

export const useUser = () => {return useContext(UserContext)};

