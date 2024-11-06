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

  const lessons = course.subjects.flatMap((subject) =>
    subject.topics.flatMap((topic) => topic.lessons)
  );

  const selectedIndex = lessons.findIndex(
    (lesson) => lesson._id === selectedLesson?._id
  );

  return (
    <div className="p-4 bg-white shadow-md grid grid-cols-1 md:grid-cols-5 items-center justify-center gap-4 w-[100%] border border-red-500 ">
      {/* Content Viewer Section */}
      <div className="col-span-1 md:col-span-3 border border-red-500 min-h-[400px] w-full">
        <ContentViewer
          lesson={selectedLesson}
          lessons={lessons}
          selectedIndex={selectedIndex}
          setSelectedLesson={setSelectedLesson}
        />
      </div>

      {/* Content Details Section */}
      <div className="col-span-1 bg-gray-200 shadow-md md:col-span-2 border border-red-500 min-h-[400px] w-full overflow-y-scroll">
        <ContentDetails course={course} onSelectLesson={setSelectedLesson} />
      </div>
    </div>
  );
};

export default CourseDetailsPage;
