import { IoBookOutline } from "react-icons/io5";
import bookAnimation from "/book-animation.gif";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-cyan-50 to-blue-50  hover:bg-gradient-to-l overflow-x-hidden  font-siliguri py-8 pb-24 ">
      <div className="w-10/12 mx-auto grid grid-cols-1  lg:grid-cols-2 items-center">
        <div className="text-center lg:text-start ">
          <div className="flex justify-center lg:justify-normal items-center">
            <span>
              <img className="w-12 -mt-4" src={bookAnimation} alt="" />
            </span>
            <h3 className="text-[17px] text-blue-500 font-semibold my-2">
              {" "}
              দেশ সেরা কোর্স পাবেন এখানে
            </h3>
          </div>

          <h1 className="text-4xl text-[#3a3a3a] font-bold mb-4 leading-snug">
            {" "}
            আপনার ক্যারিয়ার শুরু হোক <br />
            <span className="text-6xl  bg-gradient-to-r from-blue-500 to-cyan-500  text-transparent bg-clip-text ">
              {" "}
              আমাদের দক্ষ কোর্সে
            </span>
          </h1>
          <p className="lg:w-9/12  ">
            আমাদের এখানে ক্লাস করুন বাংলাদেশের সব থেকে জনপ্রিয় মোশন গ্রাফিক্স
            ইউটিউবার আহসানুল্লাহ শাওন স্যারের সাথে । সাথে থাকছে প্রতিদিন দুইবেলা
            করে গুগল মিটে স্ক্রিন শেয়ারের মাধ্যমে লাইভ সাপোর্ট, রেকর্ডেড ভিডিও,
            ফ্রিল্যান্সিং এবং জব প্লেসমেন্ট সাপোর্ট ।
          </p>

          <div className="flex items-center justify-center lg:justify-start my-4">
            <div>
              <Button className="m-1 text-white bg-gradient-to-r font-semibold text-[16px] from-blue-500 to-cyan-500">
                <span className="text-xl">
                  <IoBookOutline />
                </span>
                Get Course
              </Button>
            </div>
            <Button className="btn btn-outline mx-4 btn-primary text-yellow-600">
              Contact us
            </Button>
          </div>
        </div>

        <div className="mx-auto py-12 z-30 ">
          <iframe
            className="rounded-xl md:w-[450px] md:h-[250px]"
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
