import { BsFacebook } from "react-icons/bs";
import { SlSocialInstagram } from "react-icons/sl";


export default function Footbar() {



    return (
        <footer className = 'sticky bottom-0 bg-blue-400 h-12 flex px-4'>
            <ul className="flex gap-5 items-center w-[70%] h-full">
                <li>
                    <button className = "white-button">About us</button>
                </li>
                <li>
                    <BsFacebook className = 'h-6 w-6'/>
                </li>
                <li>
                    <SlSocialInstagram className = 'h-6 w-6'/>
                </li>
                <li>
                    
                </li>
            </ul>
            
            <ul className="w-[30%] h-full flex items-center gap-5 justify-end">
                <li>
                    <button className="white-button">Contact us</button>
                </li>
                <li className="md:block hidden">
                    HorHub Co.Ltd.
                </li>
            </ul>
        </footer>
    );
}