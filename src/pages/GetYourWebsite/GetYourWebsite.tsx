import { RiFacebookCircleFill, RiYoutubeFill } from "react-icons/ri";
import "../../styles/eid-button.css";
import { MdOutlineAdsClick } from "react-icons/md";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Contact } from "lucide-react";
import WebsitesWeBuild from "@/components/WebsitesWeBuild/WebsitesWeBuild";
const GetYourWebsite = () => {
  return (
    <div className="text-white my-10">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center justify-start max-w-[80%] mx-auto">
        {/* Left Tile*/}
        <div className="order-2 md:order-1 text-center lg:text-start px-2 font-siliguri max-w-2xl mx-auto">
          {/* FWS */}
          <div className="my-2 font-montserrat">
            <span
              className="text-3xl md:text-5xl font-bold  bg-gradient-to-r from-blue-500 to-cyan-500 
                         text-transparent bg-clip-text "
            >
              Falah Web Solutions
            </span>
          </div>
          {/* Description */}
          <p className="my-6 leading-8 text-xl">
            আপনার পছন্দ অনুযায়ী যেকোন ধরণের ওয়েবসাইট বানাতে বা আপনার বর্তমান
            ওয়েবসাইটের মানোন্নয়নে আমরা আছি আপনার পাশে। বিনামূল্যে পরামর্শ পেতে
            আজই আমাদের সাথে যুক্ত হোন।
          </p>

          {/* CTA */}
          <h3 className="text-blue-400 font-semibold my-2 text-2xl">
            আপনার ওয়েবসাইট এর জন্য যোগাযোগ করুন
          </h3>
          {/*  Icons */}
          <div className="flex gap-5 text-3xl justify-center lg:justify-start">
            {/* Website Icon */}
            <Link to="#">
              <div className="relative ">
                <div className="relative block w-full p-1  text-center uppercase whitespace-nowrap overflow-hidden rounded-md font-bold">
                  <MdOutlineAdsClick className="text-blue-400" />
                  <div className="absolute inset-0 rounded-md border-animation"></div>
                </div>
              </div>
            </Link>
            {/* Facebook Icon */}
            <Link to="#">
              <div className="relative ">
                <div className="relative block w-full p-1  text-center uppercase whitespace-nowrap overflow-hidden rounded-md font-bold">
                  <RiFacebookCircleFill className="text-blue-500 " />
                  <div className="absolute inset-0 rounded-md border-animation"></div>
                </div>
              </div>
            </Link>

            {/* Youtube Icon */}
            <Link to="#">
              <div className="relative ">
                <div className="relative block w-full p-1  text-center uppercase whitespace-nowrap overflow-hidden rounded-md font-bold">
                  <RiYoutubeFill className="text-red-600" />
                  <div className="absolute inset-0 rounded-md border-animation"></div>
                </div>
              </div>
            </Link>
          </div>

          <Link to="/#">
            <Button className="my-5 text-white  font-semibold text-[16px] bg-gradient-to-r from-blue-500 to-cyan-500">
              <span className="text-xl">
                <Contact />
              </span>
              Contact Us
            </Button>
          </Link>
        </div>
        {/* Right Tile*/}
        <div className="order-1 md:order-2">
          <img
            className="w-full rounded-2xl"
            src="/get-your-website.jpg"
            alt=""
          />
        </div>
      </div>

      {/* Websites We Build */}
      <WebsitesWeBuild />
    </div>
  );
};

export default GetYourWebsite;
