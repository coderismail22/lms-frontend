import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-[#0F172A] text-gray-300  p-2 text-[16px] flex flex-col md:flex-row items-center justify-center gap-2 md:gap-10">
        <div className="flex flex-col items-center justify-center">
          <img src="/ic.gif" alt="Ismail Codes" className="w-[100px]" />

        </div>
        <div className="flex flex-col items-center">
          <p className="text-right uppercase text-sm font-bold">Get connected</p>
          <div className=" py-2 text-center font-semibold  font-poppins flex gap-5">
            <Link to="https://www.facebook.com/bdvisapro" target="_blank">
              <FaFacebook />
            </Link>
            <Link to="https://www.facebook.com/bdvisapro" target="_blank">
              <FaSquareXTwitter />
            </Link>
            <Link to="https://www.facebook.com/bdvisapro" target="_blank">
              <FaInstagram />
            </Link>
            <Link to="https://www.facebook.com/bdvisapro" target="_blank">
              <FaLinkedin />
            </Link>
            <Link to="https://www.facebook.com/bdvisapro" target="_blank">
              <FaYoutube />
            </Link>
          </div>
        </div>
      </footer>
      <footer className="footer footer-center bg-[#26283b] text-white rounded px-10 py-1">
        <div>
          <p className="text-[16px] uppercase text-center font-semibold">
             Copyright © {new Date().getFullYear()} Ismail Codes</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
