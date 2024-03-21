import React from "react";
import LoginButton from "./LoginButton";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../lib/context/UserContext";
import { Avatar, Tooltip } from "@mui/material";
import MenuBar from "./MenuBar";
import { AiFillMessage } from "react-icons/ai";

const NavigationBar = () => {
  const { currentUser, isLoading, fetchUser } = useUser();

  const location = useLocation()
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
      <ul className="flex gap-5 items-center w-[70%] h-full">
        <li className="h-full">
          <Link to="/">
            <div className="bg-gradient-to-r flex from-sky-600 to-indigo-700 h-full items-center bg-clip-text text-transparent font-bold text-lg">
              HorHub
            </div>
          </Link>
        </li>
        <li className="h-full">
          <Link to="/dorms">
            <div className={`h-full px-2 border-b-4 hover:bg-slate-600/10 hover:border-indigo-600 flex items-center hover:text-indigo-600 font-bold text-sm ${(location.pathname.split("/").length >= 2 && location.pathname.split("/")[1] === "dorms") ? "text-indigo-600 border-indigo-600" : "border-white text-slate-400"}`}>
              Search Dorm
            </div>
          </Link>
        </li>
        {currentUser && currentUser.role === "Provider" && (
          <li className="h-full">
            <Link to="/provider">
              <div className={`h-full px-2 border-b-4 hover:bg-slate-600/10 hover:border-indigo-600 flex items-center hover:text-indigo-600 font-bold text-sm ${(location.pathname.split("/").length >= 2 && location.pathname.split("/")[1] === "provider") ? "text-indigo-600 border-indigo-600" : "border-white text-slate-400"}`}>
                Dashboard
              </div>
            </Link>
          </li>
        )}
        {/* <li>
              About
            </li>
            <li>
              Dorm
            </li> */}
      </ul>
      <div className="flex items-center gap-5 w-[30%] h-full justify-end">
        
        {!isLoading && !currentUser && (
          <>
            <Tooltip title="Chats">
              <Link to="/register" className="secondary-button">
                Sign Up
              </Link>
            </Tooltip>

            <LoginButton />
          </>
        )}
        {!isLoading && currentUser && (
          <>
            <Link to="/chats" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-indigo-50 transition-colors">
              <AiFillMessage className="text-indigo-600 w-6 h-6" />
            </Link>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="w-fit h-fit rounded-full"
              >
                <Avatar src={currentUser.imageURL} />
              </div>
              <div
                tabIndex={0}
                className="dropdown-content z-[20] menu shadow bg-white rounded-box -bottom-2 translate-y-full border border-slate-100"
              >
                <MenuBar />
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
