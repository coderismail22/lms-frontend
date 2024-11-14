// src/components/EnrolledCourses.tsx
import { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import CourseCard from "@/components/CourseCard/CourseCard";
import { Course, IPopulatedStudentCourse } from "@/types/course.type";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Need to pass student id too
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          "/students/6731baa1f0897a87c9ca2e76/courses"
        );

        // Flatten the data here by mapping to extract courseId properties
        const flattenedCourses = response.data.data.map(
          (course: IPopulatedStudentCourse) => ({
            _id: course.courseId._id,
            name: course.courseId.name,
            description: course.courseId.description,
          })
        );

        setCourses(flattenedCourses); // Adjust if necessary to match response structure
      } catch (err) {
        console.error("API Request Error:", err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  console.log(courses?.[0]);
  return (
    <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {courses.map(
        (course) => (
          console.log("inside map", course),
          (<CourseCard key={course._id} course={course} />)
        )
      )}
    </div>
  );
};

export default EnrolledCourses;
