import { FaWifi } from "react-icons/fa";
import { LuParkingCircle } from "react-icons/lu";
import { PiElevatorDuotone } from "react-icons/pi";

export const dormFacilities = [
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
]