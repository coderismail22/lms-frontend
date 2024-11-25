import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import AppCourseCard from "../AppCourseCard/AppCourseCard";

const PopularCourses = () => {
  const [courses, getCourse] = useState([]);
  useEffect(() => {
    fetch("/data/course.json")
      .then((res) => res.json())
      .then((data) => getCourse(data));
  }, []);
  console.log("home courses", courses);
  return (
    <div className="mb-8 mt-24 font-siliguri">
      <SectionTitle
        title={"জনপ্রিয় কোর্স সমূহ"}
        subtitle={
          "আমাদের সেরা কোর্সে জয়েন হয়ে আজ শুরু করুন আপনার স্মার্ট ক্যারিয়ার"
        }
      ></SectionTitle>

      <div className="grid gap-4 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 w-[90%] mx-auto">
        {courses.map((course) => (
          <AppCourseCard key={course.courseId} course={course}></AppCourseCard>
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
