import React, { useEffect } from 'react'
import { useUser } from '../../lib/context/UserContext';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuthRedirect from '../../lib/authRedirect';
import LoadingPage from '../etc/LoadingPage';
import Header from '../../components/Setting/Header';
import NotFoundPage from '../etc/NotFoundPage';
import ProviderSidebar from '../../components/Provider/ProviderSidebar';

const ProviderPageLayout = () => {
    const {currentUser,isLoading,fetchUser} = useUser();
    const navigate = useNavigate();

    
    useAuthRedirect();
    
    useEffect( ()=> {
        document.title = 'Provider | HorHub'
    } ,[])

    

    if (isLoading || !currentUser) return (<LoadingPage/>);

    if (currentUser.role === "Customer") return (<NotFoundPage />)

    return (
    <div className="page gap-3">
        {/* <Header currentUser={currentUser}/> */}
        <div className= "flex-row flex w-full gap-2 h-full">
            <ProviderSidebar></ProviderSidebar>
            <div className="text-center text-lg w-full h-full border-l">
                <Outlet context = {{currentUser, isLoading, fetchUser}}/>
            </div>
            
        </div>
    </div>)
}

export default ProviderPageLayout