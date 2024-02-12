import { LuUser2 } from "react-icons/lu";
import { IoIosLogOut } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";

function MenuBar() {

    const menuList = [
        {
            name: "My Profile",
            icon: <LuUser2 className="h-5 w-5" />,
            onClick: () => {document.location.href = "/profile"}
        },
        {
            name: "Log Out",
            icon: <IoLogOutOutline className="h-5 w-5" />,
            onClick: async () => {
                const result = await fetch(process.env.REACT_APP_BACKEND_URL + '/auth/logout',{
                method : "POST",
                credentials : "include",
                });
                document.location.href = "/"
            }
        }
    ]


    return (
        <div>
            <ul className="menu bg-base-200 w-56 rounded-box text-sm">
                {
                    menuList.map((data, idx) => {
                        return (
                            <li>
                                <button 
                                    className="w-full flex items-center hover:bg-slate-100"
                                    onClick={data.onClick}>
                                    {data.icon}
                                    {data.name}
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