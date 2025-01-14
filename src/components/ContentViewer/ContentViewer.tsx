import React, { useState } from "react";
import { Lesson } from "@/types/course.type";
import ResponsiveVideo from "../ReponsiveVideo/ResponsiveVideo";
import axiosInstance from "@/api/axiosInstance";
import Loader from "../Loader/Loader";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  if (!lesson) return <Loader />;

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      setSelectedLesson(lessons[selectedIndex - 1]);
    }
  };

  const handleNext = async () => {
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
  // Modal state
  const [modalOpen, setModalOpen] = useState(false); // Control modal visibility

  const toggleModal = () => {
    setModalOpen(!modalOpen); // Toggle modal open/close
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-400  rounded shadow-md h-full p-4">
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
        <h3 className="font-semibold text-xl md:text-2xl my-3 text-white">
          {lesson.name}
        </h3>
      </div>
      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={selectedIndex === 0}
          className="bg-gradient-to-tr from-[#6a82fb] to-[#fc5c7d]  hover:from-[#fc5c7d] hover:to-[#6a82fb]"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!lesson.isAccessible || isLastLesson}
          className="bg-gradient-to-tr from-[#6a82fb] to-[#fc5c7d]  hover:from-[#fc5c7d] hover:to-[#6a82fb]"
        >
          {isLastLesson ? "Completed" : "Next"}
        </Button>
        {/* Modal Trigger Button */}
        <Button
          onClick={toggleModal} // Toggle modal visibility when clicked
          disabled={!lesson.description}
          className="bg-gradient-to-tr from-[#6a82fb] to-[#fc5c7d] hover:from-[#fc5c7d] hover:to-[#6a82fb]"
        >
          Materials
        </Button>
        {/* Modal Component */}
        <Dialog open={modalOpen} onOpenChange={toggleModal}>
          <DialogContent className="font-robotoCondensed flex flex-col items-center justify-center bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-l h-[200px] w-[80%] rounded-md">
            <DialogHeader>
              <DialogTitle className="text-left text-blue-400 font-siliguri">
                {lesson?.description}
              </DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ContentViewer;
