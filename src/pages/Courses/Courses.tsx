/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/api/axiosInstance";
import AppCourseCard from "@/components/AppCourseCard/AppCourseCard";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import Loader from "@/components/Loader/Loader";

// Fetch batches from API
const fetchBatches = async () => {
  const response = await axiosInstance.get("/batches");
  return response.data.data;
};

const Courses = () => {
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data: batches,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["batches"],
    queryFn: fetchBatches,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error)
    return (
      <p className="text-center text-red-500 font-bold text-xl">
        Something went wrong...
      </p>
    );

  // Filter batches that are active
  const activeBatches = batches?.filter((batch: any) => batch.isActive);

  // Filter based on course type and active batches
  const filteredCourses = (type: string) => {
    if (type === "all") return activeBatches;
    return activeBatches?.filter(
      (batch: any) => batch?.courseId?.courseType?.toLowerCase() === type
    );
  };

  const courseTabs = [
    { value: "all", label: "All Courses" },
    { value: "online", label: "Online Courses" },
    // { value: "offline", label: "Offline Courses" },
    { value: "pre-recorded", label: "Pre-Recorded" },
  ];

  return (
    <div className="py-8 pb-32 font-siliguri bg-[#DBEBFE]">
      <Helmet>
        <title>EJobsIT | Courses</title>
      </Helmet>

      <div className="max-w-xl mx-auto">
        <SectionTitle
          title="আমাদের কোর্স সমূহ"
          titleStyles="text-blue-400"
          subtitle="প্রফেশনাল ভিডিও এডিটিং এবং মোশন গ্রাফিক্স ফ্রি লাইভ মাস্টার ক্লাস করুন বাংলাদেশের সব থেকে জনপ্রিয় মোশন গ্রাফিক্স ইউটিউবার আহসানুল্লাহ শাওন স্যারের সাথে । আমাদের কোর্সে লাইভ ক্লাসের সাথে থাকছে প্রতিদিন দুইবেলা করে গুগল মিটে স্ক্রিন শেয়ারের মাধ্যমে লাইভ সাপোর্ট, রেকর্ডেড ভিডিও, ফ্রিল্যান্সিং এবং জব প্লেসমেন্ট সাপোর্ট ।"
          subTitleStyles="text-black"
        />
      </div>

      <div className="w-10/12 mx-auto">
        <Tabs
          defaultValue="all"
          className="my-12"
          onValueChange={(value) => setActiveTab(value)}
        >
          {/* Tabs List */}
          <TabsList className="grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-1 shadow-lg p-4 h-30">
            {courseTabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`${
                  activeTab === tab.value
                    ? "bg-blue-500 text-white border-blue-700"
                    : "bg-[#60A5FA] text-white hover:bg-gray-400 hover:text-gray-900"
                } px-4 py-2 rounded-md font-semibold border transition`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tabs Content */}
          {courseTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {filteredCourses(tab.value)?.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {filteredCourses(tab.value)?.map((batch: any) => (
                    <AppCourseCard key={batch._id} batch={batch} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-red-500 font-bold text-xl">
                  No {tab.label.toLowerCase()} found.
                </p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Courses;
