import React from 'react'
import LoginButton from './LoginButton'
import { Link } from 'react-router-dom'
import { useUser } from '../../lib/context/UserContext';
import { Avatar } from '@mui/material';
import MenuBar from './MenuBar';

const NavigationBar = () => {
  const {currentUser, isLoading, fetchUser} = useUser();

  // const logOutHandle = async () => {

  //     const result = await fetch(process.env.REACT_APP_BACKEND_URL + '/auth/logout',{
  //       method : "POST",
  //       credentials : "include",
  //     });
  //     console.log(result);
  //     await fetchUser();
  // };

  return (
    <nav className="sticky top-0 h-16 backdrop-blur-md flex items-center justify-between px-4 bg-base-100/50 z-20 border-b-2 border-slate-900/10">
          <ul className='flex gap-5 items-center w-[70%] h-full'>
            <li>
              <Link to = "/">
                HorHub
              </Link>
            </li>
            <li>
              About
            </li>
            <li>
              Dorm
            </li>
          </ul>
          <div className="flex items-center gap-5 w-[30%] h-full justify-end">
              {!isLoading && !currentUser &&(<>
                                <Link to="/register" className="secondary-button">
                                  Sign Up
                                </Link>
                                <LoginButton />
                              </>)}
              {!isLoading && currentUser && (<>
                                <div className="dropdown dropdown-end">
                                  <div tabIndex={0} role="button" className="w-fit h-fit rounded-full"><Avatar src = {currentUser.imageURL} /></div>
                                  <div tabIndex={0} className="dropdown-content z-[20] menu shadow bg-white rounded-box -bottom-2 translate-y-full border border-slate-100">
                                    <MenuBar />
                                  </div>
                                </div>
                                
                              </>
              )}
                
          </div>
      
    </nav>
  )
}

export default NavigationBar