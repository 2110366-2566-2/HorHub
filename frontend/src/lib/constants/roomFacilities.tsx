import { TbBedFilled } from "react-icons/tb";
import { GiBunkBeds } from "react-icons/gi";
import { MdOutlineTableBar } from "react-icons/md";
import { BiCloset } from "react-icons/bi";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { MdOutlineCurtains } from "react-icons/md";
import { IoTrashBinSharp } from "react-icons/io5";
import { TbAirConditioning } from "react-icons/tb";
import { LiaHotTubSolid } from "react-icons/lia";
import { PiFan } from "react-icons/pi";
import { PiTelevision } from "react-icons/pi";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { TbTeapot } from "react-icons/tb";
import { TbMicrowave } from "react-icons/tb";
import { PiToilet } from "react-icons/pi";

export const availableRoomFacilities = [
  {
    value: "singlebed",
    label: (
      <div className="checkbox-text-container">
        <TbBedFilled className="checkbox-icon" />
        <span className="checkbox-label">Single Bed</span>
      </div>
    ),
  },
  {
    value: "bunkbed",
    label: (
      <div className="checkbox-text-container">
        <GiBunkBeds className="checkbox-icon" />
        <span className="checkbox-label">Bunk Bed</span>
      </div>
    ),
  },
  {
    value: "table",
    label: (
      <div className="checkbox-text-container">
        <MdOutlineTableBar className="checkbox-icon" />
        <span className="checkbox-label">Table</span>
      </div>
    ),
  },
  {
    value: "closet",
    label: (
      <div className="checkbox-text-container">
        <BiCloset className="checkbox-icon" />
        <span className="checkbox-label">Closet</span>
      </div>
    ),
  },
  {
    value: "drawer",
    label: (
      <div className="checkbox-text-container">
        <RiArchiveDrawerLine className="checkbox-icon" />
        <span className="checkbox-label">Drawer</span>
      </div>
    ),
  },
  {
    value: "curtain",
    label: (
      <div className="checkbox-text-container">
        <MdOutlineCurtains className="checkbox-icon" />
        <span className="checkbox-label">Curtain</span>
      </div>
    ),
  },
  {
    value: "bin",
    label: (
      <div className="checkbox-text-container">
        <IoTrashBinSharp className="checkbox-icon" />
        <span className="checkbox-label">Waste Bin</span>
      </div>
    ),
  },
  {
    value: "airconditioner",
    label: (
      <div className="checkbox-text-container">
        <TbAirConditioning className="checkbox-icon" />
        <span className="checkbox-label">Air Conditioner</span>
      </div>
    ),
  },
  {
    value: "waterheater",
    label: (
      <div className="checkbox-text-container">
        <LiaHotTubSolid className="checkbox-icon" />
        <span className="checkbox-label">Water Heater</span>
      </div>
    ),
  },
  {
    value: "fan",
    label: (
      <div className="checkbox-text-container">
        <PiFan className="checkbox-icon" />
        <span className="checkbox-label">Fan</span>
      </div>
    ),
  },
  {
    value: "television",
    label: (
      <div className="checkbox-text-container">
        <PiTelevision className="checkbox-icon" />
        <span className="checkbox-label">Television</span>
      </div>
    ),
  },
  {
    value: "refrig",
    label: (
      <div className="checkbox-text-container">
        <CgSmartHomeRefrigerator className="checkbox-icon" />
        <span className="checkbox-label">Refrigerator</span>
      </div>
    ),
  },
  {
    value: "kettle",
    label: (
      <div className="checkbox-text-container">
        <TbTeapot className="checkbox-icon" />
        <span className="checkbox-label">kettle</span>
      </div>
    ),
  },
  {
    value: "microwave",
    label: (
      <div className="checkbox-text-container">
        <TbMicrowave className="checkbox-icon" />
        <span className="checkbox-label">Microwave</span>
      </div>
    ),
  },
  {
    value: "toilet",
    label: (
      <div className="checkbox-text-container">
        <PiToilet className="checkbox-icon" />
        <span className="checkbox-label">Toilet/Bathroom</span>
      </div>
    ),
  },
];
