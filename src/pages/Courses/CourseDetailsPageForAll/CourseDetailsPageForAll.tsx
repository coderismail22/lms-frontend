import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { FaCartArrowDown } from "react-icons/fa";
import { TBatchForm } from "@/types/batch.type";
import { queryClient } from "@/queryClientSetup";
// import Marquee from "react-fast-marquee";
import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/ui/button";
import { IoMdCheckboxOutline } from "react-icons/io";
import "./customdetailspage.css";
import Services from "./Services";
const fetchCourseDetails = async (courseId: string) => {
  const { data } = await axiosInstance.get(
    `/courses/get-single-course/${courseId}`
  );
  return data?.data;
};

const fetchBatchDetails = async (batchId: string) => {
  const { data } = await axiosInstance.get(`/batches/${batchId}`);
  return data?.data;
};

const CourseDetailsPageForAll = () => {
  const { batchId, courseId } = useParams();
  const navigate = useNavigate();
  // Fetch course details
  const {
    data: courseData,
    error: courseError,
    isLoading: isLoadingCourse,
    isError: isErrorCourse,
  } = useQuery({
    queryKey: ["courseDetails", courseId],
    queryFn: () => fetchCourseDetails(courseId as string),
    enabled: !!courseId, // Only fetch if courseId is defined
  });

  // Fetch batch details
  const {
    data: batchData,
    error: batchError,
    isLoading: isLoadingBatch,
    isError: isErrorBatch,
  } = useQuery({
    queryKey: ["batchDetails", batchId],
    queryFn: () => fetchBatchDetails(batchId as string),
    enabled: !!batchId, // Only fetch if courseId is defined
  });

  // enroll Handler
  const handleEnroll = (batch: TBatchForm, actualCoursePrice: number) => {
    // Redirect to the payment page with batch info and price
    queryClient.setQueryData(["paymentData"], { batch, actualCoursePrice });
    navigate("/dashboard/student/paymentpage");
  };

  if (isLoadingCourse || isLoadingBatch) {
    return <Loader />;
  }

  if (isErrorCourse || isErrorBatch) {
    return (
      <div className="p-6 text-center text-red-500">
        Error: {courseError?.message || "Failed to fetch course details"}
        Error: {batchError?.message || "Failed to fetch batch details"}
      </div>
    );
  }

  // Calculate the total number of topics (classes)
  const totalLectures =
    // TODO: make a type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    courseData?.subjects?.reduce((sum: number, subject: any) => {
      return sum + (subject?.topics?.length || 0);
    }, 0) || 0;

  return (
    <div className=" px-10 py-16 h-[100%] font-siliguri bg-[#e6f0fb]">
      {/* Course Introduction Start */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-5 items-center justify-center">
        {/* 1 */}
        {/* Titles */}
        <div className="col-span-3">
          <div>
            <h1 className="text-[#FF504D] text-[22px] font-bold text-left">
              Turn Your Passion into a Profession
            </h1>
            <h1 className="text-[45px] font-semibold text-left text-[#1F1E1E] ">
              With {courseData?.name}
            </h1>
          </div>
          {/* Feature Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 my-4 text-black max-w-2xl mx-auto">
            <div className="p-1 border-2 border-[#9adcee] py-2 text-center rounded-md">
              <p>Duration </p>
              <p className="text-2xl font-semibold ">
                {courseData?.courseLength}
              </p>
            </div>
            <div className="p-1 border-2 border-[#9adcee] py-2 text-center rounded-md">
              <p>Lectures</p>
              <p className="text-2xl font-semibold ">{totalLectures}</p>
            </div>
            <div className="p-1 border-2 border-[#9adcee] py-2 px-3 text-center rounded-md">
              <p>Projects</p>
              <p className="text-2xl font-semibold ">5 +</p>
            </div>
          </div>
          {/* Course Description */}
          <div>
            <p className="text-[20px] text-[#645F62]">
              {courseData?.description}
            </p>
          </div>
          {/* Enroll Button */}
          <div className="flex flex-col justify-center items-center rounded-md p-2 mt-5  ">
            <Button
              onClick={() =>
                handleEnroll(batchData, courseData?.coursePrice as number)
              }
              className="h-[40px] bg-blue-500 mx-1 text-white hover:bg-blue-600"
              variant="default"
            >
              <p className="flex gap-2 items-center justify-center">
                <FaCartArrowDown className="animate-bounce" />
                <p className="font-semibold text-lg">Enroll Now</p>
              </p>
            </Button>
          </div>
        </div>
        {/* 2 */}
        {/* Cover Image */}
        <img
          src={courseData?.img}
          alt={courseData?.name}
          className="max-w-[700px] h-[200px] md:h-[300px] mx-auto my-5 rounded-lg col-span-4"
        />
      </div>
      {/* Course Introduction End */}

      <h1 className="my-5 text-center text-2xl md:text-3xl font-semibold underline underline-offset-8 text-[#484b4eaa] decoration-slate-300">
        A Glimpse of The Course
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto gap-4 mt-10">
        {/* 1. Curriculum */}
        <div className=" bg-[#DBEBFE]  font-siliguri p-5 rounded-md custom-bg">
          <h1
            className="text-center font-bold text-[#fadede] mb-2 text-3xl 
  "
          >
            Course Curriculum
          </h1>
          <div className="flex items-center justify-center max-w-md min-w-full rounded-md p-2">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {courseData?.curriculum?.map((curriculum: string) => (
                <li className="flex gap-1 items-center text-[#eee4f8]">
                  <IoMdCheckboxOutline className="text-[#f2eefb]" />
                  {curriculum}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 2. Softwares */}
        <div className=" bg-[#DBEBFE]  font-siliguri p-5 rounded-md custom-bg">
          <h1
            className="text-center font-bold text-[#fadede] mb-2 text-3xl 
  "
          >
            Softwares
          </h1>
          <div className="flex items-center justify-center max-w-md min-w-full rounded-md p-2">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {courseData?.softwareList?.map((software: string) => (
                <li className="flex gap-1 items-center text-[#eee4f8]">
                  <IoMdCheckboxOutline className="text-[#f2eefb]" />
                  {software}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Career Opportunities */}
        <div className=" bg-[#DBEBFE]  font-siliguri p-5 rounded-md custom-bg">
          <h1
            className="text-center font-bold text-[#fadede] mb-2 text-3xl 
  "
          >
            Career
          </h1>
          <div className="flex items-center justify-center max-w-md min-w-full rounded-md p-2">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {courseData?.careerOpportunities?.map(
                (careerOpportunity: string) => (
                  <li className="flex gap-1 items-center text-[#eee4f8]">
                    <IoMdCheckboxOutline className="text-[#f2eefb]" />
                    {careerOpportunity}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* 4. Job Positions */}
        <div className=" bg-[#DBEBFE]  font-siliguri p-5 rounded-md custom-bg">
          <h1
            className="text-center font-bold text-[#fadede] mb-2 text-3xl 
  "
          >
            Job Positions
          </h1>
          <div className="flex items-center justify-center max-w-md min-w-full rounded-md p-2">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {courseData?.jobPositions?.map((jobPosition: string) => (
                <li className="flex gap-1 items-center text-[#eee4f8]">
                  <IoMdCheckboxOutline className="text-[#f2eefb]" />
                  {jobPosition}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="my-5">
        <Services />
      </div>

      {/* What are you waiting for ? */}
      {/* Enroll Button */}
      <div className="flex flex-col justify-center items-center rounded-md p-2 mt-5  ">
        <Button
          onClick={() =>
            handleEnroll(batchData, courseData?.coursePrice as number)
          }
          className="h-[40px] bg-blue-500 mx-1 text-white hover:bg-blue-600"
          variant="default"
        >
          <p className="flex gap-2 items-center justify-center">
            <FaCartArrowDown className="animate-bounce" />
            <p className="font-semibold text-lg">Enroll Now</p>
          </p>
        </Button>
      </div>
    </div>
  );
};

export default CourseDetailsPageForAll;
