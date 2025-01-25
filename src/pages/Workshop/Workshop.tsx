/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/api/axiosInstance";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import Loader from "@/components/Loader/Loader";
import SeminarCard from "@/components/SeminarCard/SeminarCard";

// Fetch seminars from API
const fetchSeminars = async () => {
  const response = await axiosInstance.get("/seminar");
  return response.data.data;
};

const Seminars = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data: seminars,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["seminars"],
    queryFn: fetchSeminars,
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

  // Filter seminars by "isUpcoming"
  const filteredSeminars = (isUpcoming: boolean) =>
    seminars?.filter((seminar: any) => seminar.isUpcoming === isUpcoming);

  const tabs = [
    { value: "upcoming", label: "Upcoming", filter: true },
    { value: "ended", label: "Ended", filter: false },
  ];

  return (
    <div className="py-8 pb-32 font-siliguri bg-[#DBEBFE]">
      <Helmet>
        <title>eJobsIT | Seminars</title>
      </Helmet>

      <div className="max-w-xl mx-auto">
        <SectionTitle
          title="আমাদের ওয়ার্কশপ সমূহ"
          titleStyles="text-blue-400"
          subtitle="ওয়ার্কশপে অংশগ্রহণ করে দক্ষতা অর্জন করুন এবং আপনার ক্যারিয়ারকে এগিয়ে নিয়ে যান ।"
          subTitleStyles="text-black"
        />
      </div>

      <div className="w-10/12 mx-auto">
        <Tabs
          defaultValue="upcoming"
          className="my-12"
          onValueChange={(value) => setActiveTab(value)}
        >
          {/* Tabs List */}
          <TabsList className="grid grid-cols-2 justify-center items-center gap-1 shadow-lg p-4 h-30">
            {tabs.map((tab) => (
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
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {filteredSeminars(tab.filter)?.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {filteredSeminars(tab.filter)?.map((seminar: any) => (
                    <SeminarCard key={seminar._id} seminar={seminar} />
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

export default Seminars;
