import { LuUser2 } from "react-icons/lu";
import { MdLogout, MdOutlineSettings } from "react-icons/md";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiBookOpen } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../lib/context/UserContext";

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


    return (
        <div>
            <ul className="menu bg-base-200 w-56 rounded-box text-sm">
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
                    })
                }
                
            </ul>
        </div>
    )
}

export default MenuBar