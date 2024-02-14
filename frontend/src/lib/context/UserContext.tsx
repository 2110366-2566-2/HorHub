import { createContext, useContext, useEffect, useState } from "react";
import { UserInfo } from "../type/UserHidden";
import getUser from "../getUser";
import { useLocation, useNavigate } from "react-router-dom";

const unverifyExceptionList = ['/', '/register', '/verify']

export const UserContext = createContext<{currentUser : UserInfo | null ,fetchUser : () => Promise<boolean>, isLoading: boolean,fetchUserNoRedirect : () => Promise<boolean>}>({currentUser : null , fetchUser : async () => {return false;}, isLoading: true,fetchUserNoRedirect : async () => {return false;}});

export const UserProvider = ({children} : {children : React.ReactNode}) => {
    const [currentUser,setCurrentUser] = useState<UserInfo | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true)

    const navigate = useNavigate()
    const location = useLocation()

    const fetchUserNoRedirect= async() => {
        try{
        const user : UserInfo | null = await getUser();
        setCurrentUser(user);
        setLoading(false)
        if (!user) return false;

        return true;
        } catch {
            setLoading(false);
            return false;
        }
    }

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
    
    return (<UserContext.Provider value = {{currentUser, fetchUser, isLoading, fetchUserNoRedirect}}>
        {children}
    </UserContext.Provider>);
};
/**
 * get data from UserContext
 * @returns {UserInfo | null} currentUser - current user data
 * @returns {() => Promise<boolean>} fetchUser - query your user data from server given cookie authentication and will redirect automatically if user is not verified
 * @returns {boolean} isLoading - if it true that mean your user data is still don't ready from fetchUser if it false it mean your user data is ready from fetchUser
 * @returns {() => Promise<boolean>} fetchUserNoRedirect - query your user data from server given cookie authentication but won't redirect automatically if user is not verified
 */
export const useUser = () => {return useContext(UserContext)};

