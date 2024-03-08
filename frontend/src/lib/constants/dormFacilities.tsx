import { FaWifi } from "react-icons/fa";
import { LuParkingCircle } from "react-icons/lu";
import { PiElevatorDuotone } from "react-icons/pi";
import { IoIosFitness } from "react-icons/io";
import { FaSwimmingPool } from "react-icons/fa";
import { FaShuttleVan } from "react-icons/fa";
import { MdLocalLaundryService } from "react-icons/md";
import { SiAdguard } from "react-icons/si";
import { GiKeyCard } from "react-icons/gi";
import { FaFingerprint } from "react-icons/fa";
import { BiCctv } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { MdSoupKitchen } from "react-icons/md";
import { FaSmoking } from "react-icons/fa6";
import { GiVendingMachine } from "react-icons/gi";
import { FaGlassWaterDroplet } from "react-icons/fa6";
import { Tb24Hours } from "react-icons/tb";
import { PiDogDuotone } from "react-icons/pi";

export const dormFacilities = [
    {
        value: "pet",
        label: <div className="checkbox-text-container">
            <PiDogDuotone className="checkbox-icon" />
            <span className="checkbox-label">Pet Friendly</span>
        </div>
    },
    {
        value: "wifi",
        label: <div className="checkbox-text-container">
            <FaWifi className="checkbox-icon" />
            <span className="checkbox-label">WiFi</span>
        </div>
    },
    {
        value: "parking",
        label: <div className="checkbox-text-container">
            <LuParkingCircle className="checkbox-icon" />
            <span className="checkbox-label">Parking Lot</span>
        </div>
    },
    {
        value: "elevator",
        label: <div className="checkbox-text-container">
            <PiElevatorDuotone className="checkbox-icon" />
            <span className="checkbox-label">Elevator</span>
        </div>
    },
    {
        value: "fitness",
        label: <div className="checkbox-text-container">
            <IoIosFitness className="checkbox-icon" />
            <span className="checkbox-label">Fitness Center</span>
        </div>
    },
    {
        value: "swimming",
        label: <div className="checkbox-text-container">
            <FaSwimmingPool className="checkbox-icon" />
            <span className="checkbox-label">Swimming Pool</span>
        </div>
    },
    {
        value: "shuttle",
        label: <div className="checkbox-text-container">
            <FaShuttleVan className="checkbox-icon" />
            <span className="checkbox-label">Shuttle Service</span>
        </div>
    },
    {
        value: "laundry",
        label: <div className="checkbox-text-container">
            <MdLocalLaundryService className="checkbox-icon" />
            <span className="checkbox-label">Laundry Service</span>
        </div>
    },
    {
        value: "guard",
        label: <div className="checkbox-text-container">
            <SiAdguard className="checkbox-icon" />
            <span className="checkbox-label">Security Guard</span>
        </div>
    },
    {
        value: "keycard",
        label: <div className="checkbox-text-container">
            <GiKeyCard className="checkbox-icon" />
            <span className="checkbox-label">Keycard</span>
        </div>
    },
    {
        value: "fingerprint",
        label: <div className="checkbox-text-container">
            <FaFingerprint className="checkbox-icon" />
            <span className="checkbox-label">Fingerprint</span>
        </div>
    },
    {
        value: "cctv",
        label: <div className="checkbox-text-container">
            <BiCctv className="checkbox-icon" />
            <span className="checkbox-label">CCTV</span>
        </div>
    },
    {
        value: "coworking",
        label: <div className="checkbox-text-container">
            <FaUserFriends className="checkbox-icon" />
            <span className="checkbox-label">Co-working Space</span>
        </div>
    },
    {
        value: "kitchen",
        label: <div className="checkbox-text-container">
            <MdSoupKitchen className="checkbox-icon" />
            <span className="checkbox-label">Kitchen</span>
        </div>
    },
    {
        value: "smoking",
        label: <div className="checkbox-text-container">
            <FaSmoking className="checkbox-icon" />
            <span className="checkbox-label">Smoking Area</span>
        </div>
    },
    {
        value: "vending",
        label: <div className="checkbox-text-container">
            <GiVendingMachine className="checkbox-icon" />
            <span className="checkbox-label">Vending Machine</span>
        </div>
    },
    {
        value: "dispenser",
        label: <div className="checkbox-text-container">
            <FaGlassWaterDroplet className="checkbox-icon" />
            <span className="checkbox-label">Water Dispenser</span>
        </div>
    },
    {
        value: "frontdesk",
        label: <div className="checkbox-text-container">
            <Tb24Hours className="checkbox-icon" />
            <span className="checkbox-label">24-Hour Front Desk</span>
        </div>
    },
]