import { FaPhoneVolume } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-[#2B3440] text-[#CDD3DA]  ">
        <aside>
          <Link to="/">
            <img src="/ejobsit-logo.svg" className="w-[80px] md:w-[100px]" />
          </Link>
          {/* <h3 className="text-4xl font-bold">eJobsIT</h3> */}
          <p>
            Content Creation and IT Training Academy
            <br />
          </p>
          <div>
            <div className="flex items-center gap-4 px-4 py-2 rounded-md bg-slate-800">
              <span className="">
                <FaPhoneVolume />
              </span>
              <h2>+8801730481212 </h2>
            </div>
          </div>
        </aside>
        <nav>
          <header className="footer-title">Sitemap</header>
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/courses" className="link link-hover">
            Courses
          </Link>
          <Link to="/workshop" className="link link-hover">
            Workshop
          </Link>
          <Link to="/internship" className="link link-hover">
            Internship
          </Link>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <Link to="/about" className="link link-hover">
            About Us
          </Link>
          <Link to="/get-your-website" className="link link-hover">
            Special Offer
          </Link>
        </nav>
      </footer>
      <h1 className="bg-gradient-to-r from-cyan-50 to-blue-50  text-center text-sm ">
        Copyright © {new Date().getFullYear()} eJobsIT{" "}
      </h1>
    </div>
  );
};

export default Footer;
