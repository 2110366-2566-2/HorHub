import { createContext, useContext, useEffect, useState } from "react";
import { UserInfo } from "../type/UserHidden";
import getUser from "../getUser";
import { useLocation, useNavigate } from "react-router-dom";

const unverifyExceptionList = ['/', '/register', '/verify']

export const UserContext = createContext<{currentUser : UserInfo | null ,fetchUser : () => Promise<boolean>, isLoading: boolean}>({currentUser : null , fetchUser : async () => {return false;}, isLoading: true});

export const UserProvider = ({children} : {children : React.ReactNode}) => {
    const [currentUser,setCurrentUser] = useState<UserInfo | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true)

    const navigate = useNavigate()
    const location = useLocation()

    const fetchUser = async() => {
        try {
            const user : UserInfo | null = await getUser();
            console.log(location.pathname)
            setCurrentUser(user);
            setLoading(false)
            if (!user) return false;
            
            // If not verified
            if (!user.isVerified && !(unverifyExceptionList.includes(location.pathname) || location.pathname === "/verify/" + user.id)) {
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

