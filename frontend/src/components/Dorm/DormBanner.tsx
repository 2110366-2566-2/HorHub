import { CiSquareInfo, CiLocationOn, CiCircleCheck } from "react-icons/ci";
import { BsFillTelephoneFill } from "react-icons/bs";
import DormIcon from "./DormIcon";

type DormHeader = {
  dormName: string;
  agencyName: string;
  address: string;
  contactNo: string;
  dormFacility: string[];
};

export default function DormBanner({
  dormName,
  agencyName,
  address,
  contactNo,
  dormFacility,
}: DormHeader) {
  console.log(dormFacility);
  return (
    <div className="w-full bg-sky-300">
      <div className="flex p-4 md:w-4/5 w-full flex-col items-center">
        <div className="w-3/4 flex text-lg text-blue-600 font-bold">
          {/* <CiSquareInfo size={50} /> */}
          Dorm Information
        </div>
        <div className="w-3/4">
          <div className="font-bold text-5xl">{dormName}</div>
          <div className="text-blue-600">Provider: {agencyName}</div>
          <div className="flex place-content-between sm:flex-row flex-col">
            <DormIcon title={"Overview Location"} content={address}>
              <CiLocationOn size={25} />
            </DormIcon>
            <DormIcon title={"Contact Number"} content={contactNo}>
              <BsFillTelephoneFill size={25} />
            </DormIcon>
            {/* <DormIcon
              title={"Dorm Facilities"}
              content={dormFacility.join(" ")}
            >
              <CiCircleCheck size={25} />
            </DormIcon> */}
          </div>
        </div>
      </div>
    </div>
  );
}
