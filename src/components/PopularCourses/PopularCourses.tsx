import SectionTitle from "../SectionTitle/SectionTitle";
import AppCourseCard from "../AppCourseCard/AppCourseCard";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { TCourse } from "@/pages/Dashboard/Admin/CourseManagement/Course/courseColumns";
import Loader from "../Loader/Loader";

const fetchCourses = async (): Promise<TCourse[]> => {
  const response = await axiosInstance.get("/courses/get-all-courses");
  return response.data.data; // Assuming `data` contains the course array
};
const PopularCourses = () => {
  // Fetch courses using TanStack Query
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  if (isLoading) {
    <Loader />;
  }

  if (error) {
    <p>Something went wrong ...</p>;
  }

  return (
    <div className="h-full font-siliguri bg-[#1D232A] my-7">
      <SectionTitle
        title={"জনপ্রিয় কোর্স সমূহ"}
        subtitle={
          "আমাদের সেরা কোর্সে জয়েন হয়ে আজ শুরু করুন আপনার স্মার্ট ক্যারিয়ার"
        }
      ></SectionTitle>

      <div className="grid gap-4 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 w-[90%] mx-auto ">
        {Array.isArray(courses) ? (
          courses.map((course: TCourse) => (
            <AppCourseCard key={course._id} course={course} />
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default PopularCourses;
