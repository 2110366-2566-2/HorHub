import { useEffect } from "react";
import { useUser } from "./context/UserContext";
import { useNavigate } from "react-router-dom";
/**
 * when use this custome hook on *page* it will automatically redirect to home page if only user lose authentication
 * @returns None
 */
export default function useAuthRedirect(){

    const {currentUser, isLoading, fetchUser} = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        fetchUser();
    },[]);

    useEffect(() => {
        if (!isLoading && !currentUser){
            navigate('/');
        }
    },[currentUser,isLoading])

    return;
}