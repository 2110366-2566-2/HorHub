import { useNavigate } from "react-router-dom";
import UserPanel from "../../components/Profile/UserPanel";
import { useUser } from "../../lib/context/UserContext";
import { useEffect } from "react";




export default function ProfilePage(){

    const {currentUser,fetchUser} = useUser();
    const navigate = useNavigate();

    

    useEffect(() => {
        const redirect = async ()=> {
            const res = await fetchUser();
            if (!res)
                navigate("/",{replace : true});
        }
        redirect();
    },[]);

    
    

    return (<div>
        <UserPanel />
    </div>);
}