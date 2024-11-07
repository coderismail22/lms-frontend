import CourseCard from "@/components/CourseCard/CourseCard";
import { mockCourses } from "@/assets/data/mockCourseData";
console.log(mockCourses);
const EnrolledCourses = () => {
  return (
    // TODO: Make tabs (e.g. Free courses | Premium courses | Conceptual sessions)
    <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mockCourses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default EnrolledCourses;
