import React from "react";
import { Lesson } from "@/types/course.type";
import ResponsiveVideo from "../ReponsiveVideo/ResponsiveVideo";
import axiosInstance from "@/api/axiosInstance";

interface ContentViewerProps {
  courseId: string;
  studentId: string;
  lesson: Lesson | null;
  lessons: Lesson[];
  selectedIndex: number;
  setSelectedLesson: (lesson: Lesson) => void;
  setLessons: (lessons: Lesson[]) => void; // Update lessons state to reflect changes
}

const ContentViewer: React.FC<ContentViewerProps> = ({
  courseId,
  studentId,
  lesson,
  lessons,
  selectedIndex,
  setSelectedLesson,
  setLessons,
}) => {
  if (!lesson) return <p>Select a lesson to view content.</p>;

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      setSelectedLesson(lessons[selectedIndex - 1]);
    }
  };

  const handleNext = async () => {
    console.log("clicked next lesson id", lesson._id);
    if (selectedIndex < lessons.length - 1) {
      // First, mark the current lesson as completed
      await updateLessonProgress(lesson._id);

      // Unlock the next lesson by updating the state
      const nextLesson = { ...lessons[selectedIndex + 1], isAccessible: true };
      const updatedLessons = lessons.map((l, index) =>
        index === selectedIndex + 1 ? nextLesson : l
      );

      // Set the new lessons state and move to the next lesson
      setLessons(updatedLessons);
      setSelectedLesson(nextLesson);
    }
  };

  const updateLessonProgress = async (lessonId: string) => {
    try {
      await axiosInstance.patch(`/students/update-student-lesson-progress`, {
        studentId,
        courseId,
        lessonId,
      });
    } catch (error) {
      console.error("Failed to update lesson progress:", error);
    }
  };

  const isLastLesson = selectedIndex === lessons.length - 1;

  return (
    <div className="w-full bg-blue-200 rounded shadow-md h-full p-4">
      <h3 className="font-semibold text-xl mb-2">{lesson.name}</h3>
      <div className="mb-4">
        {lesson.isAccessible ? (
          lesson.type === "video" ? (
            <ResponsiveVideo url={lesson.content} />
          ) : (
            <p>{lesson.content}</p>
          )
        ) : (
          <p>This lesson is locked.</p>
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
          disabled={!lesson.isAccessible || isLastLesson}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          {isLastLesson ? "Completed" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default ContentViewer;
