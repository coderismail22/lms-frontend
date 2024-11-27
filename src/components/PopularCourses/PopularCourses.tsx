import { useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import AppCourseCard from "../AppCourseCard/AppCourseCard";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { TCourse } from "@/pages/Dashboard/Admin/CourseManagement/Course/courseColumns";

const fetchCourses = async (): Promise<TCourse[]> => {
  const response = await axiosInstance.get("/courses/get-all-courses");
  return response.data.data; // Assuming `data` contains the course array
};
const PopularCourses = () => {
  // useEffect(() => {
  //   fetch("/data/course.json")
  //     .then((res) => res.json())
  //     .then((data) => getCourse(data));
  // }, []);
  // console.log("home courses", courses);

  // Fetch courses using TanStack Query
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  console.log("fetchedcourses", courses);
  if (isLoading) {
    <p>Loading...</p>;
  }
  if (error) {
    <p>Something went wrong ...</p>;
  }
  console.log("fetchedcourses", courses);

  return (
    <div className="mb-8 mt-24 font-siliguri">
      <SectionTitle
        title={"জনপ্রিয় কোর্স সমূহ"}
        subtitle={
          "আমাদের সেরা কোর্সে জয়েন হয়ে আজ শুরু করুন আপনার স্মার্ট ক্যারিয়ার"
        }
      ></SectionTitle>

      <div className="grid gap-4 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 w-[90%] mx-auto">
        {courses?.map((course, index) => (
          <AppCourseCard key={index} course={course}></AppCourseCard>
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
