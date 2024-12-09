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
        <div className="flex flex-col items-center justify-center cursor-pointer">
          <Link to="/">
            <img src="/ejobsit-logo.svg" alt="EjobsIT" className="w-[100px]" />
          </Link>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-right uppercase text-sm font-bold">Follow us</p>
          <div className=" py-2 text-center font-semibold  font-poppins flex gap-5">
            <Link to="#" target="_blank">
              <FaFacebook />
            </Link>
            <Link to="#" target="_blank">
              <FaSquareXTwitter />
            </Link>
            <Link to="#" target="_blank">
              <FaInstagram />
            </Link>
            <Link to="#" target="_blank">
              <FaLinkedin />
            </Link>
            <Link to="#" target="_blank">
              <FaYoutube />
            </Link>
          </div>
        </div>
      </footer>
      <footer className="footer footer-center bg-[#26283b] text-white rounded px-10 py-1">
        <div>
          <p className="text-[12px] uppercase text-center font-semibold">
            Copyright © {new Date().getFullYear()} Falah Web Solutions
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
