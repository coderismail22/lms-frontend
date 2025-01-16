import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { FaCartArrowDown } from "react-icons/fa";
import { TBatchForm } from "@/types/batch.type";
import { queryClient } from "@/queryClientSetup";
// import Marquee from "react-fast-marquee";
import Loader from "@/components/Loader/Loader";
import "./customdetailspage.css";
// import TrainerSection from "@/components/TrainerSection/TrainerSection";
import CourseCurriculum from "@/components/CourseCurriculum/CourseCurriculum";
import CourseSoftwares from "@/components/CourseSoftware/CourseSoftware";
import CourseDesignedFor from "@/components/CourseDesignedFor/CourseDesignedFor";
// import CareerOpportunities from "@/components/CareerOpportunities/CareerOpportunities";
import OpenJobPositions from "@/components/OpenJobPositions/OpenJobPositions";
import ExclusiveSolutions from "@/components/ExclusiveSolutions/ExclusiveSolutions";
import { Subject, Topic } from "@/types/course.type";
import SuccessStory from "@/components/SuccessStory/SuccessStory";
import AdmissionGoingOn from "@/components/AdmissionGoingOn/AdmissionGoingOn";
import CourseOverview from "@/components/CourseOverview/CourseOverview";
import CareerOpportunities from "@/components/CareerOpportunities/CareerOpportunities";
import { AxiosError } from "axios";
import { handleAxiosError } from "@/utils/handleAxiosError";
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
    if (isErrorCourse) {
      handleAxiosError(
        courseError as AxiosError,
        "Failed to fetch course details"
      );
    }
    if (isErrorBatch) {
      handleAxiosError(
        batchError as AxiosError,
        "Failed to fetch batch details"
      );
    }
    return (
      <div className="p-6 text-center text-red-500">
        Error: {courseError?.message || "Failed to fetch course details"}
        Error: {batchError?.message || "Failed to fetch batch details"}
      </div>
    );
  }

  // Calculate the total number of topics (classes)
  // Calculate the total number of lessons
  const totalLessons =
    courseData?.subjects?.reduce((lessonSum: number, subject: Subject) => {
      return (
        lessonSum +
        (subject?.topics?.reduce((topicLessonSum: number, topic: Topic) => {
          return topicLessonSum + (topic?.lessons?.length || 0);
        }, 0) || 0)
      );
    }, 0) || 0;

  return (
    <div className="w-full md:px-10 py-5 md:py-16  h-[100%] font-siliguri bg-[#e6f0fb]">
      {/* Course Introduction Start */}
      <div className="flex lg:flex-row flex-col gap-10 items-center justify-between w-10/12 mx-auto my-12   font-montserrat">
        {/* 1 */}
        {/* Titles */}
        <div>
          <div>
            <h1 className="text-[#FF504D] text-[22px] font-bold text-left">
              Turn Your Passion into a Profession
            </h1>
            <h1 className="text-[45px] font-semibold text-left text-[#1F1E1E] font-siliguri ">
              {courseData?.name}
            </h1>
          </div>
          {/* Feature Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-start justify-start gap-4 my-4 text-black max-w-2xl ">
            <div className="p-1 border-2 border-[#9adcee] py-2 text-center rounded-md">
              <p>Duration </p>
              <p className="text-xl font-semibold">
                {courseData?.courseLength}
              </p>
            </div>
            <div className="p-1 border-2 border-[#9adcee] py-2 text-center rounded-md">
              <p>Lectures</p>
              <p className="text-xl font-semibold ">{totalLessons}</p>
            </div>
            <div className="p-1 border-2 border-[#9adcee] py-2 px-3 text-center rounded-md">
              <p>Projects</p>
              <p className="text-xl font-semibold ">5 +</p>
            </div>
          </div>
          {/* Course Description */}
          <div>
            <p className="text-[22px] text-[#645F62] font-siliguri">
              {courseData?.description}
            </p>
          </div>
          {/* Enroll Button */}
          <div className="flex flex-col justify-center items-start rounded-md p-2 mt-5  font-siliguri">
            <div
              onClick={() =>
                handleEnroll(batchData, courseData?.coursePrice as number)
              }
            >
              <p className="btn text-white bg-gradient-to-r w-full font-semibold text-[16px] from-cyan-500 to-blue-500 border-none">
                <FaCartArrowDown className="animate-bounce" />
                <p className="font-semibold text-xl">এনরোল করুন</p>
              </p>
            </div>
          </div>
        </div>
        {/* 2 */}
        {/* Cover Image */}
        <div className="max">
          <img
            src={courseData?.img}
            alt={courseData?.name}
            className="w-[5000px] h-[400px] object-cover object-center mx-auto my-5 rounded-lg "
          />
        </div>
      </div>

      {/* Trainer */}
      {/* <div className="max-w-6xl mx-auto  my-10">
        <TrainerSection />
      </div> */}

      {/* Course Overview */}
      {/* <CourseOverview overview={courseData?.overview} /> */}

      {/* Curriculum & Success Story */}
      {/* <div className="flex flex-col md:flex-row my-5 gap-2">
        <CourseCurriculum curriculum={courseData?.curriculum} />
        <div className="max-w-sm  rounded-md mx-2 p-4 bg-gradient-to-r from-cyan-50 to-blue-50">
          <SuccessStory />
        </div>
      </div> */}

      {/* Softwares and Admission Going On */}
      {/* <div className="col-span-2">
        <CourseSoftwares softwares={courseData?.softwareList} />
      </div>
      <div className="col-span-1">
        <AdmissionGoingOn />
      </div> */}

      {/* Job Positions */}
      {/* <OpenJobPositions jobPositions={courseData?.jobPositions} /> */}

      {/* Responsive Grid */}
      <div className="w-[73%] mx-auto grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <CourseOverview overview={courseData?.overview} />
          <CourseCurriculum curriculum={courseData?.curriculum} />
          <CourseSoftwares softwares={courseData?.softwareList} />
          <OpenJobPositions jobPositions={courseData?.jobPositions} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <SuccessStory />
          <div className="sticky top-6">
            <AdmissionGoingOn />
          </div>
        </div>
      </div>

      {/* Target Audience */}
      <div className="my-10 ">
        <CourseDesignedFor />
      </div>

      {/* Career Opportunities */}
      <CareerOpportunities />

      {/* Exclusive Solutions That Set Us Apart*/}
      <div className="w-10/12 mx-auto my-10">
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
        {/* Enroll Button */}
        <div
          onClick={() =>
            handleEnroll(batchData, courseData?.coursePrice as number)
          }
        >
          <p className="btn text-white bg-gradient-to-r w-full font-semibold text-[16px] from-cyan-500 to-blue-500 border-none">
            <FaCartArrowDown className="animate-bounce" />
            <p className="font-semibold text-xl">এনরোল করুন</p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPageForAll;
