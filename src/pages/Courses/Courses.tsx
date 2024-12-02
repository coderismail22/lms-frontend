import axiosInstance from "@/api/axiosInstance";
import AppCourseCard from "@/components/AppCourseCard/AppCourseCard";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { TCourse } from "../Dashboard/Admin/CourseManagement/Course/courseColumns";
import { useQuery } from "@tanstack/react-query";

const fetchCourses = async (): Promise<TCourse[]> => {
  const response = await axiosInstance.get("/courses/get-all-courses");
  return response.data.data; // Assuming `data` contains the course array
};
const Courses = () => {
  // State to track the active tab
  // TODO: Fix the stupid active status issue with tabs
  const [activeTab, setActiveTab] = useState("all");
  // console.log("active", activeTab);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  // Add a type annotation to courses

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;

  const onlineCourses = courses?.filter(
    (course) => course?.courseType === "Online"
  );
  const offlineCourses = courses?.filter(
    (course) => course?.courseType === "Offline"
  );
  return (
    <div className="py-8 bg-gradient-to-l from-slate-500 to-slate-600 pb-32 font-siliguri">
      {/* <Helmet>
        <title>EJobsIT | Courses</title>
      </Helmet> */}
      {/* <TopTite /> */}
      <div className="max-w-xl mx-auto">
        <SectionTitle
          title="আমাদের কোর্স সমূহ"
          titleStyles="text-blue-400"
          subtitle="প্রফেশনাল ভিডিও এডিটিং এবং মোশন গ্রাফিক্স ফ্রি লাইভ মাস্টার ক্লাস করুন বাংলাদেশের সব থেকে জনপ্রিয় মোশন গ্রাফিক্স ইউটিউবার আহসানুল্লাহ শাওন স্যারের সাথে । আমাদের কোর্সে লাইভ ক্লাসের সাথে থাকছে প্রতিদিন দুইবেলা করে গুগল মিটে স্ক্রিন শেয়ারের মাধ্যমে লাইভ সাপোর্ট, রেকর্ডেড ভিডিও, ফ্রিল্যান্সিং এবং জব প্লেসমেন্ট সাপোর্ট ।"
          subTitleStyles="text-white"
        />
      </div>

      <div className="w-10/12 mx-auto">
        <Tabs
          defaultValue="all"
          className="my-12"
          onValueChange={(value) => setActiveTab(value)} // Track active tab
        >
          {/* Tabs List */}
          <TabsList className="grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-1 shadow-lg p-4 h-30">
            <TabsTrigger
              value="all"
              className={`${
                activeTab === "online"
                  ? "bg-gray-700 text-white" // Slightly darker for active tab
                  : "bg-gray-800 text-white" // Dark background for inactive tabs
              } px-4 py-2 rounded-md font-semibold transition`}
            >
              All Courses
            </TabsTrigger>
            <TabsTrigger
              value="online"
              className={`${
                activeTab === "online"
                  ? "bg-gray-700 text-white" // Slightly darker for active tab
                  : "bg-gray-800 text-white" // Dark background for inactive tabs
              } px-4 py-2 rounded-md font-semibold transition`}
            >
              Online Courses
            </TabsTrigger>
            <TabsTrigger
              value="offline"
              className={`${
                activeTab === "offline"
                  ? "bg-gray-700 text-white" // Slightly darker for active tab
                  : "bg-gray-800 text-white" // Dark background for inactive tabs
              } px-4 py-2 rounded-md font-semibold transition`}
            >
              Offline Courses
            </TabsTrigger>
          </TabsList>

          {/* Tabs Content */}
          <TabsContent value="all">
            {courses?.length !== undefined && courses?.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {courses?.map((course) => (
                  <AppCourseCard key={course._id} course={course} />
                ))}
              </div>
            ) : (
              <p className="text-center text-white">No courses found.</p>
            )}
          </TabsContent>
          <TabsContent value="online">
            {onlineCourses?.length !== undefined &&
            onlineCourses?.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {onlineCourses?.map((course) => (
                  <AppCourseCard key={course._id} course={course} />
                ))}
              </div>
            ) : (
              <p className="text-center text-white">No online courses found.</p>
            )}
          </TabsContent>
          <TabsContent value="offline">
            {offlineCourses?.length !== undefined &&
            offlineCourses?.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {offlineCourses?.map((course) => (
                  <AppCourseCard key={course._id} course={course} />
                ))}
              </div>
            ) : (
              <p className="text-center text-white">
                No offline courses found.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Courses;
