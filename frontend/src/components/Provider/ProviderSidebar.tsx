import { Link, useLocation } from "react-router-dom";
import { LuUser2 } from "react-icons/lu";
import { BsBuilding } from "react-icons/bs";
import ListSettingItem from "../Setting/ListSettingItem";

export default function ProviderSidebar() {
  //inside li should be link
  const location = useLocation();
  let currentPath = location.pathname.split("provider/")[1];
  if (currentPath) {
    currentPath = currentPath.split("/")[0];
  }
  return (
    <nav className="w-2/4 md:w-1/4 h-full text-sm">
      <ul className="grid grid-cols-1">
        <Link to="dorms">
          <ListSettingItem active={currentPath === "dorms"}>
            <BsBuilding />
            <div>My Dorms</div>
          </ListSettingItem>
        </Link>
        {/* <Link to = "account">
                <ListSettingItem active = {currentPath === "account"}>
                    <GoGear />
                    <div>Account</div>
                </ListSettingItem>
            </Link> */}

        {/* <Link to = "password">
                <ListSettingItem active = {currentPath === "password"}>
                    <RiLockPasswordFill />
                    <div>Change Password</div>
                </ListSettingItem>
            </Link>
            <Link to = "email">
                <ListSettingItem active = {currentPath === "email"}>
                    <MdOutlineMail />
                    <div>Change Email</div>
                </ListSettingItem>
            </Link>
            <Link to = "delete">
                <ListSettingItem active = {currentPath === "delete"}>
                    <FaRegTrashAlt />
                    <div>Delete Account</div>
                </ListSettingItem>
            </Link>
            {/*<ListSettingItem >
                <div>Public Profile</div>
            </ListSettingItem>
            <ListSettingItem >
                <div>Public Profile</div>
            </ListSettingItem> */}
      </ul>
    </nav>
  );
}
