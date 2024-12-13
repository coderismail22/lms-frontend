import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlinePhoneInTalk } from "react-icons/md";

export const TopBanner = () => {
  return (
    <div className=" text-white flex justify-center md:justify-between gap-5  px-5 max-w-6xl mx-auto">
      <div className="py-2 text-center font-semibold  font-poppins flex gap-5 ">
        <Link to="https://www.youtube.com/@AhsanullahSHAON" target="_blank">
          <FaYoutube />
        </Link>
        <Link to="https://www.facebook.com/@ahsanullahshaon1" target="_blank">
          <FaFacebook />
        </Link>
        <Link to="#">
          <FaSquareXTwitter />
        </Link>
        <Link to="#">
          <FaInstagram />
        </Link>
        <Link to="#">
          <FaLinkedin />
        </Link>
      </div>
      <div className="font-palanquin text-sm flex  gap-5 ">
        <div className="flex gap-2 justify-center items-center">
          <MdOutlinePhoneInTalk />
          <p className="font-semibold">+8801730481212</p>
        </div>
      </div>
    </div>
  );
};
