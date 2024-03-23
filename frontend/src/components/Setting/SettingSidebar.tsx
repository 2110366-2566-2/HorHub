import { IoPersonCircleOutline } from "react-icons/io5";
import ListSettingItem from "./ListSettingItem";
import { GoGear } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { LuUser2 } from "react-icons/lu";
import { FaRegCreditCard } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdMoneyOffCsred } from "react-icons/md";
export default function SettingSidebar() {
  //inside li should be link
  const location = useLocation();
  const currentPath = location.pathname.split("settings/")[1];
  return (
    <nav className="w-2/4 md:w-1/4 h-full text-sm">
      <ul className="grid grid-cols-1">
        <Link to="profile">
          <ListSettingItem active={currentPath === "profile"}>
            <LuUser2 />
            <div>Public Profile</div>
          </ListSettingItem>
        </Link>
        <Link to="account">
          <ListSettingItem active={currentPath === "account"}>
            <GoGear />
            <div>Account</div>
          </ListSettingItem>
        </Link>
        <Link to="payment_information">
          <ListSettingItem active={currentPath === "payment_information"}>
            <FaRegCreditCard />
            <div>Payment Information</div>
          </ListSettingItem>
        </Link>
        <Link to="withdrawn">
          <ListSettingItem active={currentPath === "withdrawn"}>
            <MdMoneyOffCsred />
            <div>Withdrawn</div>
          </ListSettingItem>
        </Link>
        <Link to="topup">
          <ListSettingItem active={currentPath === "topup"}>
            <MdOutlineAttachMoney />
            <div>Top Up</div>
          </ListSettingItem>
        </Link>
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
