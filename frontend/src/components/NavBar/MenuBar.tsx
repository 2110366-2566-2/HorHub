import { LuUser2 } from "react-icons/lu";
import { MdLogout, MdOutlineSettings } from "react-icons/md";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiBookOpen } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../lib/context/UserContext";
import { IoTicketOutline, IoWalletOutline } from "react-icons/io5";
import { Avatar } from "@mui/material";

function MenuBar() {

    const iconClassName = "h-4 w-4"
    const navigate = useNavigate();
    const {currentUser, fetchUser} = useUser();
    const menuList = [
        {
            name: "My Profile",
            icon: <LuUser2 className={iconClassName} />,
            onClick: () => {navigate('/profile')}
        },
        {
            name: "My Wallet",
            icon: <IoWalletOutline className={iconClassName} />,
            onClick: () => {navigate('/my-wallet')},
            allow: "Provider"
        },
        {
            name: "My Reservation",
            icon: <FiBookOpen className={iconClassName} />,
            onClick: () => {navigate('/bookings')},
            allow: "Customer"
        },
        {
            name: "Dashboard",
            icon: <MdOutlineSpaceDashboard className={iconClassName} />,
            onClick: () => {navigate('/provider/dorms')},
            allow: "Provider"
        },
        {
            name: "Issues Dashboard",
            icon: <IoTicketOutline className={iconClassName} />,
            onClick: () => {navigate('/support')},
            allow: "Admin"
        },
        {
            name: "Settings",
            icon: <MdOutlineSettings className={iconClassName} />,
            onClick: () => {navigate('/settings/profile')}
        },
        {
            name: "Log Out",
            icon: <MdLogout className={iconClassName} />,
            onClick: async () => {
                const result = await fetch(process.env.REACT_APP_BACKEND_URL + '/auth/logout',{
                method : "POST",
                credentials : "include",
                });
                fetchUser();
                navigate('/');
            }
        },

    ]

    const isTooCloseToWhite = (color: string): boolean => {
        const r: number = parseInt(color.substring(1, 3), 16);
        const g: number = parseInt(color.substring(3, 5), 16);
        const b: number = parseInt(color.substring(5, 7), 16);
    
        const brightness: number = (r * 299 + g * 587 + b * 114) / 1000;
    
        return brightness > 200;
    }

    const getRandomColor = (): string => {
        const letters: string = '0123456789ABCDEF';
        let color: string = '#';
    
        do {
            color = '#';
            for (let i: number = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
        } while (isTooCloseToWhite(color));
    
        return color;
    }

    const gradientText = document.getElementById('gradientText');

    if (gradientText) {
        gradientText.style.backgroundImage = `linear-gradient(45deg, ${getRandomColor()}, ${getRandomColor()})`;
    }

    return (
        <div>
            <ul className="menu bg-base-200 w-56 rounded-box text-sm">
                {currentUser && 
                    <li className="flex justify-center items-center">
                        <button 
                            className="w-fit h-fit rounded-full"
                            onClick={() => {navigate('/profile')}}>
                            <Avatar sx={{ width: 52, height: 52 }} src={currentUser.imageURL} />
                        </button>
                        <div id="gradientText" className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 pointer-events-none">Hello, {currentUser.displayName}</div>
                    </li>
                }
                {
                    menuList.map((data, idx) => {
                        if (!data.allow || !currentUser) {
                            return (
                                <li key={data.name}>
                                    <button 
                                        className="w-full flex items-center hover:bg-slate-100"
                                        onClick={data.onClick}>
                                        {data.icon}
                                        <span className="text-sm">{data.name}</span>
                                    </button>
                                </li>
                            )
                        }
                        if (data.allow === "Customer") {
                            if (currentUser.role === "Customer") {
                                return (
                                    <li key={data.name}>
                                        <button 
                                            className="w-full flex items-center hover:bg-slate-100"
                                            onClick={data.onClick}>
                                            {data.icon}
                                            <span className="text-sm">{data.name}</span>
                                        </button>
                                    </li>
                                )
                                
                            }
                            else {
                                return;
                            }
                        }
                        else if (data.allow === "Provider") {
                            if (currentUser.role === "Provider") {
                                return (
                                    <li key={data.name}>
                                        <button 
                                            className="w-full flex items-center hover:bg-slate-100"
                                            onClick={data.onClick}>
                                            {data.icon}
                                            <span className="text-sm">{data.name}</span>
                                        </button>
                                    </li>
                                )
                                
                            }
                            else {
                                return;
                            }
                        }
                        else if (data.allow === "Admin") {
                            if (currentUser.role === "Admin") {
                                return (
                                    <li key={data.name}>
                                        <button 
                                            className="w-full flex items-center hover:bg-slate-100"
                                            onClick={data.onClick}>
                                            {data.icon}
                                            <span className="text-sm">{data.name}</span>
                                        </button>
                                    </li>
                                )
                                
                            }
                            else {
                                return;
                            }
                        }
                    })
                }
                
            </ul>
        </div>
    )
}

export default MenuBar