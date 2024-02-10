import React from 'react'
import LoginButton from './LoginButton'
import { Link } from 'react-router-dom'
import { useUser } from '../../lib/context/UserContext';
import Cookies from 'js-cookie';

const NavigationBar = () => {
  const {currentUser,fetchUser} = useUser();
  const logOutHandle = async () => {

      const result = await fetch(process.env.REACT_APP_BACKEND_URL + '/auth/logout',{
        method : "POST",
        credentials : "include",
      });
      console.log(result);
      await fetchUser();
  };
  return (
    <nav className="sticky top-0 h-16 backdrop-blur-md flex items-center justify-between px-4 bg-base-100/50 z-20 border-b-2 border-slate-900/10">
          <ul className='flex gap-5 items-center w-[70%] h-full'>
            <li>
              HorHub
            </li>
            <li>
              About
            </li>
            <li>
              Dorm
            </li>
          </ul>
          <div className="flex items-center gap-5 w-[30%] h-full justify-end">
              {!currentUser &&(<>
                                <Link to="/register" className="secondary-button">
                                  Sign Up
                                </Link>
                                <LoginButton />
                              </>)}
              {currentUser && (<>
                                <button onClick = {async () => {await logOutHandle();}}>
                                  Logout
                                </button>
              
                              </>
              )}
                
          </div>
      
    </nav>
  )
}

export default NavigationBar