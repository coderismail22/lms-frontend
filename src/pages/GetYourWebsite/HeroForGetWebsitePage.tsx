import { IoBookOutline } from "react-icons/io5";
import bookAnimation from "/book-animation.gif";
import { Link } from "react-router-dom";
// import { Contact } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroForGetWebsitePage = () => {
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
              দেশ সেরা ওয়েবসাইট পাবেন এখানে
            </h3>
          </div>

          <h1 className="text-4xl text-[#3a3a3a] font-bold mb-4 leading-snug">
            {" "}
            আপনার বিজনেস এগিয়ে যাক <br />
            <span className="text-6xl  bg-gradient-to-r from-blue-500 to-cyan-500  text-transparent bg-clip-text ">
              আমাদের সলুশনে
            </span>
          </h1>
          <p className="lg:w-9/12">
            আপনার পছন্দ অনুযায়ী যেকোন ধরণের ওয়েবসাইট বানাতে বা আপনার বর্তমান
            ওয়েবসাইটের মানোন্নয়নে আমরা আছি আপনার পাশে। বিনামূল্যে পরামর্শ পেতে
            আজই আমাদের সাথে যুক্ত হোন।
          </p>

          <div className="flex items-center justify-center lg:justify-start my-4">
            <Link to="https://www.facebook.com/sakibtechdev" target="_blank">
              <Button className="m-1 text-white  font-semibold text-[16px] bg-gradient-to-r from-blue-500 to-cyan-500">
                <span className="text-xl">
                  <IoBookOutline />
                </span>
                Get Your Website
              </Button>
            </Link>
          </div>
        </div>

        <div className="mx-auto">
          <img
            className="w-[80%] h-full rounded-2xl mx-auto"
            src="/get-your-website.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HeroForGetWebsitePage;
