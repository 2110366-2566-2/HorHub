import { LuUser2 } from "react-icons/lu";
import { MdLogout, MdOutlineSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../lib/context/UserContext";

function MenuBar() {

    const iconClassName = "h-4 w-4"
    const navigate = useNavigate();
    const {fetchUser} = useUser();
    const menuList = [
        {
            name: "My Profile",
            icon: <LuUser2 className={iconClassName} />,
            onClick: () => {document.location.href = "/profile"}
        },
        {
            name: "Settings",
            icon: <MdOutlineSettings className={iconClassName} />,
            onClick: () => {document.location.href = "/profile/setting/profile"}
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
        }
    ]


    return (
        <div>
            <ul className="menu bg-base-200 w-56 rounded-box text-sm">
                {
                    menuList.map((data, idx) => {
                        return (
                            <li key={idx}>
                                <button 
                                    className="w-full flex items-center hover:bg-slate-100"
                                    onClick={data.onClick}>
                                    {data.icon}
                                    <span className="text-sm">{data.name}</span>
                                </button>
                            </li>
                        )
                    })
                }
                
            </ul>
        </div>
    )
}

export default MenuBar