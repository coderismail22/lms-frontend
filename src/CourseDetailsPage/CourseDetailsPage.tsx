// src/components/CourseDetailsPage.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import ContentDetails from "@/components/ContentDetails/ContentDetails";
import ContentViewer from "@/components/ContentViewer/ContentViewer";
import { mockCourses } from "@/assets/data/mockCourseData";
import { Lesson } from "@/types/course.type";

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const course = mockCourses.find((c) => c._id === courseId);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  if (!course) return <p>Course not found.</p>;

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 w-[800px] ">
      {/* Content Viewer Section */}
      <ContentViewer lesson={selectedLesson} />

      {/* Content Details Section */}
      <ContentDetails course={course} onSelectLesson={setSelectedLesson} />
    </div>
  );
};

export default CourseDetailsPage;
