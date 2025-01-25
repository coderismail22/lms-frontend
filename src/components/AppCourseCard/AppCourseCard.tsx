import { IoBookOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { TbCoinTaka, TbListDetails } from "react-icons/tb";
import { Subject, Topic } from "@/types/course.type";
import { FaCartArrowDown } from "react-icons/fa";
import { TBatchForm } from "@/types/batch.type";
import { queryClient } from "@/queryClientSetup";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppCourseCard = ({ batch }: { batch: any }) => {
  const {
    courseId: course, // has all the fields populated
    batchImg,
    batchName,
    trainers,
  } = batch;

  // Calculate the total number of lessons
  const totalLessons =
    course?.subjects?.reduce((lessonSum: number, subject: Subject) => {
      return (
        lessonSum +
        (subject?.topics?.reduce((topicLessonSum: number, topic: Topic) => {
          return topicLessonSum + (topic?.lessons?.length || 0);
        }, 0) || 0)
      );
    }, 0) || 0;

  const navigate = useNavigate();
  // enroll Handler
  const handleEnroll = (batch: TBatchForm, actualCoursePrice: number) => {
    // Redirect to the payment page with batch info and price
    queryClient.setQueryData(["paymentData"], { batch, actualCoursePrice });
    navigate("/dashboard/student/paymentpage");
  };
  return (
    <Card className="bg-transparent overflow-hidden flex flex-col justify-between h-full  font-siliguri border-none rounded-lg">
      {/* Card Header */}
      <div className="flex-grow ">
        <figure>
          <img
            className="h-[200px] md:h-[300px]  w-full  object-cover object-center"
            src={batchImg}
            alt="course"
          />
        </figure>
        <div className="flex flex-col items-start m-2 ">
          <div className="text-white font-bold py-1 px-2 text-sm bg-blue-500 rounded-full">
            <Link to="#">{course?.courseType || "N/A"}</Link>
          </div>
        </div>

        <h2 className="font-bold text-2xl text-[#1F1E1E] px-2">
          {course?.name || "N/A"}
        </h2>
        <h2 className="font-bold text-md text-slate-400 px-2">
          {batchName || "N/A"}
        </h2>
      </div>

      {/* Card Content */}
      <div className="mt-2 px-2 ">
        {/* Instructor */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 my-2 rounded-md  ">
          <div className="p1 border-r-2 border-gray-400 pr-4">
            <img
              className="size-6 object-cover object-left rounded-full"
              src={trainers[0].profileImg}
              alt="trainer"
            />
          </div>
          <Link to="#">
            <p className="text-[#3a67ae] font-semibold text-[16px]">
              {trainers[0].teacherName || "N/A"}
            </p>
          </Link>
        </div>
        <div className="flex my-2 px-1">
          {/* Class */}
          <div className="flex  justify-items-center  items-center gap-2 w-full text-[18px] ">
            <p className=" text-gray-400">
              <IoBookOutline />
            </p>
            <p className="font-semibold text-zinc-400">
              ক্লাস সংখ্যা {totalLessons}
            </p>
          </div>
          {/* Course Fee */}
          <div className="flex  justify-items-center items-center  gap-2  w-full text-[18px] ">
            <p className=" text-gray-400">
              <TbCoinTaka />
            </p>
            <p className="font-semibold text-[#EA7171]">
              ফি {course?.coursePrice || 0} টাকা
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex px-2 justify-between items-center mb-2 max-w-xl">
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
