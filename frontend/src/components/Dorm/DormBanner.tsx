import { CiSquareInfo, CiLocationOn, CiCircleCheck } from "react-icons/ci";
import { BsFillTelephoneFill } from "react-icons/bs";
import DormIcon from "./DormIcon";
import { AiFillMessage } from "react-icons/ai";
import { useUser } from "../../lib/context/UserContext";
import { createChat } from "../../lib/chat";
import { useNavigate } from "react-router-dom";

type DormHeader = {
  dormName: string;
  agencyName: string;
  address: string;
  contactNo: string;
  dormFacility: string[];
  owner: string;
};

export default function DormBanner({
  dormName,
  agencyName,
  address,
  contactNo,
  dormFacility,
  owner,
}: DormHeader) {

  const {currentUser, isLoading} = useUser()
  const navigate = useNavigate()
  
  async function handleCreateChat() {
    if (!currentUser) return

    const chatId = await createChat(owner, currentUser.id)

    if (!chatId) return

    navigate('/chats/' + chatId)
  }


  return (
    <div className="w-full bg-indigo-100">
      <div className="flex p-4 md:w-4/5 w-full flex-col items-center relative">
        <div className="w-3/4 flex text-xl text-indigo-600 font-bold">
          {/* <CiSquareInfo size={50} /> */}
          Dorm Information
        </div>
        <div className="w-3/4 gap-2">
          <div className="font-bold text-5xl">{dormName}</div>
          {/* <div className="text-indigo-600">Provider: {agencyName}</div> */}
          <div className="flex place-content-between sm:flex-row flex-col text-base">
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
          {
            (currentUser && currentUser.role === "Customer") &&
            <div className="pt-3">
              <button className="primary-button flex items-center gap-2" onClick={handleCreateChat}><AiFillMessage className="text-white w-4 h-4" /> Chat with Provider</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
