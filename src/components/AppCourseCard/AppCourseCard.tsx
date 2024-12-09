import { IoBookOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "@radix-ui/react-separator";
import { TbCoinTaka, TbListDetails } from "react-icons/tb";
import { Subject } from "@/types/course.type";
import { FaCartArrowDown } from "react-icons/fa";
import { TBatchForm } from "@/types/batch.type";
import { queryClient } from "@/queryClientSetup";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
// import useAuth from "../../../Hooks/useAuth";
// import useCart from "../../../Hooks/useCart";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppCourseCard = ({ batch }: { batch: any }) => {
  const {
    courseId: course, // has all the fields populated
    batchImg,
    batchName,
  } = batch;

  // Calculate the total number of topics (classes)
  const totalTopics =
    course?.subjects?.reduce((sum: number, subject: Subject) => {
      return sum + (subject?.topics?.length || 0);
    }, 0) || 0;

  const navigate = useNavigate();
  // enroll Handler
  const handleEnroll = (batch: TBatchForm, actualCoursePrice: number) => {
    // Redirect to the payment page with batch info and price
    queryClient.setQueryData(["paymentData"], { batch, actualCoursePrice });
    navigate("/dashboard/student/paymentpage");
  };
  return (
    <Card className="bg-base-100 shadow-xl overflow-hidden flex flex-col justify-between h-full border-none bg-[#1D232A]">
      {/* Card Header */}
      <div className="flex-grow">
        <figure>
          <img
            className="w-full h-[200px] object-cover object-center"
            src={batchImg}
            alt="course"
          />
        </figure>
        <div className="flex flex-col items-center justify-center m-2">
          <Badge variant="destructive" className="text-white ">
            <Link to="#">{course?.courseType || "N/A"}</Link>
          </Badge>
        </div>

        <h2 className="font-bold text-3xl text-slate-400 text-center">
          {batchName || "N/A"}
        </h2>
        <h2 className="font-bold text-md text-slate-400 text-center">
          {course?.name || "N/A"}
        </h2>
      </div>

      {/* Card Content */}
      <div className="mt-2">
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
            <p className="font-semibold text-zinc-400">
              সময়কাল {course?.courseLength || 0}
            </p>
          </div>
          <Separator />
          <div className="flex justify-center items-center  gap-2  w-full text-[15px]">
            <p className=" text-white">
              <TbCoinTaka />
            </p>
            <p className="font-semibold text-zinc-400">
              কোর্স ফি {course?.coursePrice || 0} টাকা
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex justify-between items-center m-1">
        <div className="w-full ">
          <div
            onClick={() => navigate(`/courses/${batch?._id}/${course?._id}`)}
          >
            <Button className="text-white bg-gradient-to-r w-full font-semibold text-[16px] from-cyan-500 to-blue-500 hover:from-blue-600 hover:to-blue-600">
              <p className="text-xl">
                <TbListDetails />
              </p>
              <p>Course Details</p>
            </Button>
          </div>
        </div>
        {/* Enroll Button */}
        <div>
          <Button
            onClick={() => handleEnroll(batch, course?.coursePrice as number)}
            className="bg-blue-500 mx-1 text-white hover:bg-blue-600"
          >
            <FaCartArrowDown />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AppCourseCard;
