// src/components/EnrolledCourses.tsx
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import CourseCard from "@/components/CourseCard/CourseCard";
import { Course } from "@/types/course.type";
import { FullPopulatedCourse } from "@/types/fullCourseAndStudent.type";

const fetchCourses = async () => {
  const { data } = await axiosInstance.get(`/students/user/courses`);
  const response = data?.data;
  return response;
};

const EnrolledCourses = () => {
  const {
    data,
    isLoading: isCourseLoading,
    error: courseError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  if (isCourseLoading) return <p>Loading...</p>;
  if (courseError)
    return <p>{courseError ? courseError?.message : "An error occurred"}</p>;
  return (
    <div>
      <h1>Enrolled Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.courses?.length === 0 && <p>No enrolled courses</p>}
        {data?.courses?.map((course: FullPopulatedCourse, index: string) => (
          <CourseCard key={index} course={course} studentId={data?.studentId} />
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
