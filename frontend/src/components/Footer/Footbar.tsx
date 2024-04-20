import { BsFacebook } from "react-icons/bs";
import { SlSocialInstagram } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function Footbar() {
  return (
    <footer className="sticky bottom-0 bg-blue-400 h-12 flex px-4">
      <ul className="flex gap-5 items-center w-[70%] h-full">
        <li>
          <a href="https://www.youtube.com/watch?v=dUFzP0zZHB0" target="_blank" className="text-black white-button">About us</a>
        </li>
        <li>
          <a href="https://facebook.com/sukiteenoithailand" target="_blank" className="text-black" >
            <BsFacebook className="h-6 w-6" />
          </a>
          
        </li>
        <li>
          <a href="https://www.instagram.com/p_rahus_but_algo_so_easy/" target="_blank" className="text-black" >
            <SlSocialInstagram className="h-6 w-6" />
          </a>
        </li>
        <li></li>
      </ul>

      <ul className="w-[30%] h-full flex items-center gap-5 justify-end">
        <li>
          <Link to="support" className="white-button">
            Report Issue
          </Link>
        </li>
        <li className="md:block hidden">HorHub Co.Ltd.</li>
      </ul>
    </footer>
  );
}
