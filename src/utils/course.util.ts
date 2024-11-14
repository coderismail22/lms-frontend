import { Course, Lesson } from "@/types/course.type";

export const getLastCompletedLesson = (course: Course): Lesson | null => {
  for (const subject of course.subjects) {
    for (const topic of subject.topics) {
      for (const lesson of topic.lessons) {
        if (!lesson.isCompleted) {
          return lesson; // Return the last completed lesson or the first incomplete lesson
        }
      }
    }
  }
  return null; // No completed lesson found
};
