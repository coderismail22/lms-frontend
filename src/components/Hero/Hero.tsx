import { IoBookOutline } from "react-icons/io5";
import bookAnimation from "/book-animation.gif";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Contact } from "lucide-react";

const Hero = () => {
  return (
    <div className=" bg-gradient-to-r from-cyan-50 to-blue-50  hover:bg-gradient-to-l overflow-x-hidden  font-siliguri w-full pt-24 pb-32 ">
      <div className="w-10/12 mx-auto grid grid-cols-1  lg:grid-cols-2 items-center ">
        <div className="text-center lg:text-start ">
          <div className="flex justify-center lg:justify-normal items-center">
            <span>
              <img className="w-12 -mt-4" src={bookAnimation} alt="" />
            </span>
            <h3 className="text-[17px] text-blue-500 font-semibold my-2">
              {" "}
              eJobsIT এর সাথে 
            </h3>
          </div>

          <h1 className="text-4xl text-[#3a3a3a] font-bold mb-4 leading-snug">
            {" "}
            আজ থেকেই ডিজিটাল দক্ষতায়  <br />
            <span className="text-6xl  bg-gradient-to-r from-blue-500 to-cyan-500  text-transparent bg-clip-text ">
              {" "}
              স্মার্ট ক্যারিয়ার গড়ুন
            </span>
          </h1>
          <p className="lg:w-9/12">
          দক্ষ প্রশিক্ষক, বাস্তবমুখী প্রজেক্ট এবং আপডেটেড সিলেবাসের মাধ্যমে আমরা নিশ্চিত করি একটি কার্যকরী ও ফলপ্রসূ শেখার অভিজ্ঞতা, যা আপনাকে ভবিষ্যতের প্রতিযোগিতায় সাফল্যের শীর্ষে পৌঁছে দেবে ।
          </p>

          <div className="flex items-center justify-center lg:justify-start my-4">
            <Link to="/courses">
              <Button className="m-1 text-white  font-semibold text-[16px] bg-gradient-to-r from-blue-500 to-cyan-500">
                <span className="text-xl">
                  <IoBookOutline />
                </span>
                Get Course
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="m-1 text-white  font-semibold text-[16px] bg-gradient-to-r from-blue-500 to-cyan-500">
                <span className="text-xl">
                  <Contact />
                </span>
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

        <div className="mx-auto z-30 ">
          <iframe
            className="rounded-xl w-[300px]  h-[200px] md:w-[500px] md:h-[350px] xl:w-[600px] xl:h-[400px] 2xl:w-[700px] 2xl:h-[400px] "
            src="https://www.youtube.com/embed/CuZWHuug1U4"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Hero;
