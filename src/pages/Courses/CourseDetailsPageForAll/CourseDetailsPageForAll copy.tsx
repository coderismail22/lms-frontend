import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaCartArrowDown } from "react-icons/fa";
import { TBatchForm } from "@/types/batch.type";
import { queryClient } from "@/queryClientSetup";
import { IoMdCheckboxOutline } from "react-icons/io";
// import Marquee from "react-fast-marquee";
import Loader from "@/components/Loader/Loader";

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

  return (
    <div className="container mx-auto p-6 h-[100%] font-siliguri">
      {/* Course Card */}
      <Card className="max-w-2xl mx-auto border-2 border-red-500 my-6 bg-opacity-0 text-black border-none">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
          <div className="flex items-center justify-center mt-5">
            <img
              src={courseData.img}
              alt={courseData.name}
              className="w-[250px] rounded-lg shadow-md"
            />
          </div>
          <div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="flex items-center gap-2 mt-5">
                <Badge variant="destructive">{courseData?.courseType}</Badge>
              </div>
              <p className="text-2xl font-bold my-1 text-white">
                {courseData?.name}
              </p>
              <p className="text-white font-semibold">
                Course Length: {courseData?.courseLength}
              </p>
              <p className="text-white font-semibold">
                Price: {courseData?.coursePrice} BDT
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Overview */}
      <div className="w-full mx-auto font-siliguri text-white ">
        <div className="p-12 mb-12 rounded-md  text-center mx-auto">
          <h3 className="decoration-blue-500  text-4xl font-semibold underline underline-offset-8  mb-4">
            Course Overview
          </h3>
          <p className="max-w-xl mx-auto text-justify">
            {courseData?.description}
          </p>
        </div>
      </div>

      {/* 4 Feature Box */}
      {/* TODO: Separate as another component */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 my-2 text-white max-w-2xl mx-auto">
        <div className="p-1 border-2 py-2 text-center rounded-md">
          <p>
            <span className="text-2xl font-semibold ">ইন্ডাস্ট্রি </span>
            স্ট্যান্ডার্ড কোর্স
          </p>
        </div>
        <div className="p-1 border-2 py-2 text-center rounded-md">
          <p>
            <span className="text-2xl font-semibold">পর্যাপ্ত</span> ক্লাস
          </p>
        </div>
        <div className="p-1 border-2 py-2 text-center rounded-md">
          <p>
            <span className="text-2xl font-semibold">পর্যাপ্ত</span> লাইভ
            প্রজেক্ট
          </p>
        </div>
        <div className="p-1 border-2 py-2 px-3 text-center rounded-md">
          <p>
            <span className="text-2xl font-semibold">প্রতি</span>দিন গুগল মিটের
            মাধ্যমে লাইভ সাপোর্ট
          </p>
        </div>
      </div>

      {/* TODO: make a separate component */}
      {/* Course Curriculum Section Start*/}
      <div className="my-20 max-w-3xl mx-auto">
        <h3 className="underline underline-offset-8 decoration-blue-500 text-4xl font-semibold my-8 text-center text-white">
          Course Curriculum
        </h3>
        {/* All 4 Items */}
        <div className="w-full h-full grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Curriculum */}
          <div className="border border-blue-500 bg-[#DBEBFE]  font-siliguri p-2 rounded-md">
            <h1
              className="text-center font-bold text-blue-600 tracking-wider my-1 text-sm underline hover: underline-offset-4 hover:underline-offset-8 transition-all duration-300
  "
            >
              Curriculum
            </h1>
            <div className="w-full  rounded-md p-2">
              <ul className="flex flex-col gap-1 ">
                {courseData?.curriculum.map((software: string) => (
                  <li className="flex gap-1 items-center font-semibold text-[#605F62]">
                    <IoMdCheckboxOutline className="text-blue-700" />
                    {software}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* 2.Softwares */}
          <div className="border border-blue-500 bg-[#DBEBFE]  font-siliguri p-2 rounded-md">
            <h1
              className="text-center font-bold text-blue-600 tracking-wider my-1 text-sm underline hover: underline-offset-4 hover:underline-offset-8 transition-all duration-300
  "
            >
              Softwares
            </h1>
            <div className="w-full  rounded-md p-2">
              <ul className="flex flex-col gap-1 ">
                {courseData?.softwareList.map((software: string) => (
                  <li className="flex gap-1 items-center font-semibold text-[#605F62]">
                    <IoMdCheckboxOutline className="text-blue-700" />
                    {software}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* 3. Career Opportunities */}
          <div className="border border-blue-500 bg-[#DBEBFE]  font-siliguri p-2 rounded-md">
            <h1
              className="text-center font-bold text-blue-600 tracking-wider my-1 text-sm underline hover: underline-offset-4 hover:underline-offset-8 transition-all duration-300
  "
            >
              Career Opportunities
            </h1>
            <div className="w-full  rounded-md p-2">
              <ul className="flex flex-col gap-1 ">
                {courseData?.careerOpportunities.map((software: string) => (
                  <li className="flex gap-1 items-center font-semibold text-[#605F62]">
                    <IoMdCheckboxOutline className="text-blue-700" />
                    {software}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* 4.Job Positions */}
          <div className="border border-blue-500 bg-[#DBEBFE]  font-siliguri p-2 rounded-md">
            <h1
              className="text-center font-bold text-blue-600 tracking-wider my-1 text-sm underline hover: underline-offset-4 hover:underline-offset-8 transition-all duration-300
  "
            >
              Job Positions
            </h1>
            <div className="w-full  rounded-md p-2">
              <ul className="flex flex-col gap-1 ">
                {courseData?.jobPositions.map((software: string) => (
                  <li className="flex gap-1 items-center font-semibold text-[#605F62]">
                    <IoMdCheckboxOutline className="text-blue-700" />
                    {software}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Course Curriculum Section End*/}

      <div className="max-w-sm mx-auto rounded-md p-2 mt-5">
        <Button
          onClick={() =>
            handleEnroll(batchData, courseData?.coursePrice as number)
          }
          className="w-full bg-blue-500 hover:bg-blue-600"
          variant="default"
        >
          <p className="flex gap-2 items-center justify-center">
            <FaCartArrowDown className="animate-bounce" />
            Enroll Now
          </p>
        </Button>
      </div>
    </div>
  );
};

export default CourseDetailsPageForAll;
