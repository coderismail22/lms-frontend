import React from "react";
import { Lesson } from "@/types/course.type";
import ResponsiveVideo from "../ReponsiveVideo/ResponsiveVideo";

interface ContentViewerProps {
  lesson: Lesson | null;
  lessons: Lesson[];
  selectedIndex: number;
  setSelectedLesson: (lesson: Lesson) => void;
}

const ContentViewer: React.FC<ContentViewerProps> = ({
  lesson,
  lessons,
  selectedIndex,
  setSelectedLesson,
}) => {
  if (!lesson) return <p>Select a lesson to view content.</p>;

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      setSelectedLesson(lessons[selectedIndex - 1]);
    }
  };

  const handleNext = () => {
    if (selectedIndex < lessons.length - 1) {
      setSelectedLesson(lessons[selectedIndex + 1]);
    }
  };

  return (
    <div className="w-[100%] bg-gray-200 rounded shadow-md h-full p-4">
      <h3 className="font-semibold text-xl mb-2">{lesson.name}</h3>
      <div className="mb-4">
        {lesson.type === "video" ? (
          <ResponsiveVideo url={lesson.content} />
        ) : (
          <p>{lesson.content}</p>
        )}
      </div>
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={selectedIndex === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={selectedIndex === lessons.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContentViewer;
