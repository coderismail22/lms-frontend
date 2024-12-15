// src/components/EnrolledCourses.tsx
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import CourseCard from "@/components/CourseCard/CourseCard";
import { FullPopulatedCourse } from "@/types/fullCourseAndStudent.type";
import Loader from "@/components/Loader/Loader";

const fetchCourses = async () => {
  const { data } = await axiosInstance.get(`/students/user/courses`);
  const response = data?.data;
  return response;
};

const EnrolledCourses = () => {
  // Fetch enrolled courses
  const {
    data,
    isLoading: isCourseLoading,
    error: courseError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  console.log("isCourseLoading", isCourseLoading);
  if (isCourseLoading) {
    return <Loader />;
  }
  if (courseError)
    return <p>{courseError ? courseError?.message : "An error occurred"}</p>;
  return (
    <div

    // className="bg-[#c6dbf3] h-[100%] p-5"
    >
      <h1 className="font-bold text-center tracking-wider mb-5 underline underline-offset-8 decoration-blue-500">
        Enrolled Courses
      </h1>
      {data?.courses?.length === 0 && (
        <p className="text-center text-red-500 text-lg font-bold uppercase">
          No enrolled course found
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl">
        {data?.courses?.map((course: FullPopulatedCourse, index: string) => (
          <CourseCard key={index} course={course} studentId={data?.studentId} />
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
