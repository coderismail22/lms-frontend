// src/components/CourseDetailsPage.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ContentDetails from "@/components/ContentDetails/ContentDetails";
import ContentViewer from "@/components/ContentViewer/ContentViewer";
import axiosInstance from "@/api/axiosInstance";
import { Course, Lesson, Subject, Topic } from "@/types/course.type";

const CourseDetailsPage = () => {
  const { studentId, courseId } = useParams<{
    studentId: string;
    courseId: string;
  }>();

  // State to hold course data and selected lesson
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Fetch and transform the course data for frontend needs
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axiosInstance.get(
          `/students/${studentId}/courses/${courseId}`
        );
        const fetchedData = response.data.data;

        // Transform the data to structure it with appropriate types
        const transformedCourseData: Course = {
          ...fetchedData.courseId,
          subjects: fetchedData.courseId.subjects.map((subject: Subject) => {
            const progressSubject = fetchedData.subjects.find(
              (sub: { subjectId: string }) => sub.subjectId === subject._id
            );
            return {
              ...subject,
              topics: subject.topics.map((topic: Topic) => {
                const progressTopic = progressSubject?.topics.find(
                  (top: { topicId: string }) => top.topicId === topic._id
                );
                return {
                  ...topic,
                  lessons: topic.lessons.map((lesson: Lesson) => {
                    const progressLesson = progressTopic?.lessons.find(
                      (les: { lessonId: string }) => les.lessonId === lesson._id
                    );
                    return {
                      ...lesson,
                      isCompleted: progressLesson?.isCompleted ?? false,
                      completedAt: progressLesson?.completedAt ?? null,
                      isAccessible: progressLesson?.isAccessible ?? false,
                    };
                  }),
                };
              }),
            };
          }),
        };
        console.log("transformed data", transformedCourseData);
        setCourseData(transformedCourseData);

        // Flatten all lessons into a single array for easier indexing and navigation
        const allLessons = transformedCourseData.subjects
          .flatMap((subject) => subject.topics)
          .flatMap((topic) => topic.lessons);

        setLessons(allLessons);

        // Fetch the last completed lesson from the backend
        const lastCompletedLessonResponse = await axiosInstance.post(
          `/students/get-last-completed-lesson`,
          {
            studentId: "6731baa1f0897a87c9ca2e76",
            courseId: "67270d2a8481df2630cb2bd1",
          }
        );

        const lastCompletedLessonId = lastCompletedLessonResponse.data.data;

        // Find the last completed lesson or the first accessible lesson
        const firstAccessibleLesson = allLessons.find(
          (lesson) => lesson.isAccessible
        );

        setSelectedLesson(
          (lastCompletedLessonId
            ? allLessons.find((lesson) => lesson._id === lastCompletedLessonId)
            : firstAccessibleLesson) || null
        );
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [studentId, courseId]);

  if (!courseData) return <p>Loading...</p>;

  const selectedIndex = lessons.findIndex(
    (lesson) => lesson._id === selectedLesson?._id
  );

  return (
    <div className="p-4 bg-white shadow-md grid grid-cols-1 md:grid-cols-5 items-center justify-center gap-4 w-[100%] border border-red-500">
      <div className="col-span-1 md:col-span-3 border border-red-500 min-h-[400px] w-full">
        <ContentViewer
          courseId={courseId || ""}
          studentId={studentId || ""}
          lesson={selectedLesson}
          lessons={lessons}
          selectedIndex={selectedIndex}
          setSelectedLesson={setSelectedLesson}
          setLessons={setLessons}
        />
      </div>
      <div className="col-span-1 bg-gray-200 shadow-md md:col-span-2 border border-red-500 min-h-[400px] w-full overflow-y-scroll">
        <ContentDetails
          course={courseData}
          onSelectLesson={setSelectedLesson}
        />
      </div>
    </div>
  );
};

export default CourseDetailsPage;
