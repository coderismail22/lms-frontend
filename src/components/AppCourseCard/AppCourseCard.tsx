import { BiCategoryAlt } from "react-icons/bi";
import { IoBookOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "@radix-ui/react-separator";
import { TbCoinTaka } from "react-icons/tb";
import { Subject } from "@/types/course.type";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import useAuth from "../../../Hooks/useAuth";
// import useCart from "../../../Hooks/useCart";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppCourseCard = ({ course }: { course: any }) => {
  const {
    // courseId,
    name,
    courseType, //showing _id only of the category
    coursePrice,
    subjects,
    courseLength,
    img,
  } = course;

  // Calculate the total number of topics (classes)
  const totalTopics = subjects
    ? subjects?.reduce(
        (sum: number, subject: Subject) => sum + (subject.topics?.length || 0),
        0
      )
    : 0;

  return (
    <Card className="bg-base-100 shadow-xl overflow-hidden flex flex-col justify-between h-full border-none">
      {/* Card Header */}
      <div className="flex-grow">
        <figure>
          <img className="w-full h-full" src={img} alt="course" />
        </figure>
        <div className="flex flex-col items-center justify-center m-2">
          <Badge variant="destructive" className="text-white ">
            <Link to="#">{courseType}</Link>
          </Badge>
        </div>

        <h2 className="font-bold text-3xl text-slate-400 text-center">
          {name}
        </h2>
      </div>

      {/* Card Content */}
      <div className="">
        {/* <div className="flex items-center gap-2 bg-slate-100 p-1 mt-2 rounded-md border " >
          <div className="p1 border-r-2 border-gray-400 pr-4">
            <img className="w-6" src={trainerImageUrl} alt="" />
          </div>
        </div> */}
        <div className="mt-1">
          <div className="flex  items-center justify-center gap-2 w-full text-[15px]">
            <p className=" text-white">
              <IoBookOutline />
            </p>
            <p className="font-semibold text-zinc-400">
              ক্লাস সংখ্যা {totalTopics}
            </p>
          </div>
          <div className="flex  items-center justify-center gap-2 w-full text-[15px]">
            <p className=" text-white">
              <IoBookOutline />
            </p>
            <p className="font-semibold text-zinc-400">সময়কাল {courseLength}</p>
          </div>
          <Separator />
          <div className="flex justify-center items-center  gap-2  w-full text-[15px]">
            <p className=" text-white">
              <TbCoinTaka />
            </p>
            <p className="font-semibold text-zinc-400">
              কোর্স ফি {coursePrice} টাকা
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex justify-between m-1">
        <div className="w-full ">
          <Link to={`/courses/${course._id}`}>
            <Button className="text-white bg-gradient-to-r w-full font-semibold text-[16px] from-cyan-500 to-blue-500 hover:from-blue-600 hover:to-blue-600">
              <p className="text-xl">
                <BiCategoryAlt />
              </p>{" "}
              View Course Details
            </Button>
          </Link>
        </div>
        {/* <div>
          <Button
            onClick={handleAddToCart}
            className="bg-blue-500 mx-1 text-white hover:bg-blue-600"
          >
            <FiShoppingCart />
          </Button>
        </div> */}
      </div>
    </Card>
  );
};

export default AppCourseCard;
