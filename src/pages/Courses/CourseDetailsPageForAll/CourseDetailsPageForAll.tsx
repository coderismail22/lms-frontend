import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { FaCartArrowDown } from "react-icons/fa";
import { TBatchForm } from "@/types/batch.type";
import { queryClient } from "@/queryClientSetup";
// import Marquee from "react-fast-marquee";
import Loader from "@/components/Loader/Loader";
import { Button } from "@/components/ui/button";
import "./customdetailspage.css";
import TrainerSection from "@/components/TrainerSection/TrainerSection";
import CourseCurriculum from "@/components/CourseCurriculum/CourseCurriculum";
import CourseSoftwares from "@/components/CourseSoftware/CourseSoftware";
import CourseDesignedFor from "@/components/CourseDesignedFor/CourseDesignedFor";
import CareerOpportunities from "@/components/CareerOpportunities/CareerOpportunities";
import OpenJobPositions from "@/components/OpenJobPositions/OpenJobPositions";
import ExclusiveSolutions from "@/components/ExclusiveSolutions/ExclusiveSolutions";
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
    <div className="w-full px-10 py-16  h-[100%] font-siliguri bg-[#e6f0fb]">
      {/* Course Introduction Start */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center justify-center max-w-5xl mx-auto font-montserrat">
        {/* 1 */}
        {/* Titles */}
        <div className="col-span-7">
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
              <p className="text-2xl font-semibold">
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
            <p className="text-[18px] text-[#645F62]">
              {courseData?.description}
            </p>
          </div>
          {/* Enroll Button */}
          <div className="flex flex-col justify-center items-center rounded-md p-2 mt-5  font-siliguri">
            <Button
              onClick={() =>
                handleEnroll(batchData, courseData?.coursePrice as number)
              }
              className="h-[40px] bg-blue-500 mx-1 text-white hover:bg-blue-600"
              variant="default"
            >
              <p className="flex gap-2 items-center justify-center">
                <FaCartArrowDown className="animate-bounce" />
                <p className="font-semibold text-lg">এনরোল করুন</p>
              </p>
            </Button>
          </div>
        </div>
        {/* 2 */}
        {/* Cover Image */}
        <div className="col-span-5 ">
          <img
            src={courseData?.img}
            alt={courseData?.name}
            className="w-full h-[300px] object-cover object-center mx-auto my-5 rounded-lg "
          />
        </div>
      </div>

      {/* Trainer */}
      <div className="max-w-xl mx-auto  my-10">
        <TrainerSection />
      </div>

      {/* Curriculum and Softwares */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 items-start justify-center">
        <CourseCurriculum curriculum={courseData?.curriculum} />
        <CourseSoftwares softwares={courseData?.softwareList} />
      </div>

      {/* Target Audience */}
      <div className="my-10 ">
        <CourseDesignedFor />
      </div>

      {/* Career Opportunities */}
      <div className="my-5 ">
        <CareerOpportunities />
      </div>

      {/* Open Job Positions */}
      <div className="my-5 max-w-2xl mx-auto">
        <OpenJobPositions jobPositions={courseData?.jobPositions} />
      </div>

      {/* Exclusive Solutions That Set Us Apart*/}
      <div className="my-10">
        <ExclusiveSolutions />
      </div>

      {/* What are you waiting for ? */}
      {/* Enroll Button */}
      <div className="flex flex-col justify-center items-center rounded-md p-2 mt-5  ">
        <div>
          <h3 className="text-4xl font-semibold my-8 p-5 text-center font-siliguri  bg-gradient-to-r from-blue-500 to-cyan-500  text-transparent bg-clip-text ">
            তাই, স্মার্ট ক্যারিয়ার গড়তে এখনই ...
          </h3>
        </div>
        <Button
          onClick={() =>
            handleEnroll(batchData, courseData?.coursePrice as number)
          }
          className="h-[40px] bg-blue-500 mx-1 text-white hover:bg-blue-600"
          variant="default"
        >
          <p className="flex gap-2 items-center justify-center font-siliguri">
            <FaCartArrowDown className="animate-bounce" />
            <p className="font-semibold text-lg">এনরোল করুন</p>
          </p>
        </Button>
      </div>
    </div>
  );
};

export default CourseDetailsPageForAll;
