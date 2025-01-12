import { IoBookOutline } from "react-icons/io5";
import { MdLiveTv } from "react-icons/md";
import img1 from "../../../public/wd.png";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Category = () => {
  return (
    <div className="flex lg:flex-row flex-col justify-center gap-8 mx-auto my-12 -mt-16 font-siliguri">
      <div className="mt-20 ">
        <Button className="h-5 w-5 p-5 rounded-full border  border-blue-500 bg-black ">
          <FaArrowLeft />
        </Button>
      </div>
      <div className=" flex flex-col justify-center items-center shadow-xl  border text-center px-16 rounded-3xl py-6 bg-white ">
        <span className="text-6xl mb-2 ">
          <MdLiveTv className="text-purple-900" />
        </span>
        <h3 className="text-2xl font-semibold">অনলাইন লাইভ কোর্স</h3>
        <div>
          <Link to="/courses">
            {" "}
            <Button className="btn m-1 flex justify-center  bg-gradient-to-r font-semibold text-[16px]">
              <span className="text-xl ">
                <IoBookOutline />
              </span>
              View Course
            </Button>
          </Link>
        </div>
      </div>

      <div className=" flex flex-col justify-center items-center  border shadow-xl text-center px-16 rounded-3xl bg-white py-6 ">
        <div>
          <img className="w-10 m-4" src={img1} alt="" />
        </div>
        <h3 className="text-2xl font-semibold">প্রী-রেকর্ডেড কোর্স</h3>
        <div>
          <Link to="/courses">
            {" "}
            <Button className="btn m-1 flex justify-center  bg-gradient-to-r font-semibold text-[16px]">
              <span className="text-xl ">
                <IoBookOutline />
              </span>
              View Course
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-20 -pr-12">
        <Button className="h-5 w-5 p-5 rounded-full border  border-blue-500 bg-black ">
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default Category;
