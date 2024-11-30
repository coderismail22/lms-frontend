// src/components/EnrolledCourses.tsx
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import CourseCard from "@/components/CourseCard/CourseCard";
import { Course } from "@/types/course.type";
import { useStudent } from "@/hooks/useStudent";

const fetchCourses = async (studentId: string) => {
  const { data } = await axiosInstance.get(`/students/${studentId}/courses`);
  const courses = data?.data;
  console.log(courses);
  return courses;
};

const EnrolledCourses = () => {
  const { data: studentData, isLoading: isStudentLoading } = useStudent();

  const studentId = studentData?._id; // You can pass the studentId dynamically or as a prop

  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: () => fetchCourses(studentId),
    enabled: !!studentId, // Ensure the query doesn't run until studentId is available
  });

  if (isLoading) return <p>Loading...</p>;
  if (isStudentLoading) return <p>Loading...</p>;
  if (error)
    return (
      <p>{error instanceof Error ? error.message : "An error occurred"}</p>
    );
  console.log("enrolled courses", courses);
  return (
    <div>
      <h1>Enrolled Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses?.map((course) => (
          <CourseCard key={course._id} course={course} studentId={studentId} />
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
