import React, { useEffect, useState } from "react";
import { Course, Lesson } from "@/types/course.type";
import { LockOpenIcon } from "lucide-react";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import Loader from "../Loader/Loader";

interface ContentDetailsProps {
  course: Course;
  onSelectLesson: (lesson: Lesson) => void;
}

const ContentDetails: React.FC<ContentDetailsProps> = ({
  course,
  onSelectLesson,
}) => {
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Simulate loading data (or you could fetch data here)
  useEffect(() => {
    // Simulate a delay to show the loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);
  const toggleSubject = (subjectId: string) => {
    setExpandedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  if (loading) return <Loader />;
  return (
    <div className="shadow-md py-4 px-3 rounded-md w-full overflow-y-auto h-[80vh] font-siliguri">
      <h2 className="text-2xl font-semibold text-[#b4d4fb]">{course?.name}</h2>
      <p className="text-white">
        Total Lessons:{" "}
        {course?.subjects?.reduce(
          (total, subj) =>
            total +
            subj.topics.reduce(
              (subTotal, topic) => subTotal + topic.lessons.length,
              0
            ),
          0
        )}
      </p>

      {course?.subjects?.map((subject) => (
        <div
          key={subject?._id}
          className="mt-5 p-4 border border-gray-300 rounded-lg shadow-lg bg-gradient-to-r from-[#cef3f5] via-[#bddff0] to-[#c7f1e4]"
        >
          {/* Subject Card */}
          <div
            onClick={() => toggleSubject(subject?._id)}
            className="cursor-pointer p-4 flex justify-between items-center rounded-md bg-[#6fb1d2] hover:bg-[#5a99b7] transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {subject.name}
            </h3>
            {expandedSubjects.includes(subject?._id) ? (
              <CiSquareMinus className="h-6 w-6 text-gray-600" />
            ) : (
              <CiSquarePlus className="h-6 w-6 text-gray-600" />
            )}
          </div>

          {/* Nested Topics */}
          {expandedSubjects.includes(subject?._id) && (
            <div className="mt-3">
              {subject.topics.map((topic) => (
                <div
                  key={topic._id}
                  className="mt-3 p-3 border-l-4 border-yellow-500 bg-gradient-to-r from-teal-50 via-blue-50 to-teal-100 shadow-md pl-6"
                >
                  {/* Topic Card */}
                  <div
                    onClick={() => toggleTopic(topic._id)}
                    className="cursor-pointer p-3 flex justify-between items-center border-b-2 border-yellow-300 rounded-md bg-[#ffd966] hover:bg-[#ffcc66] transition-all duration-300"
                  >
                    <h4 className="text-lg font-medium text-gray-700">
                      {topic.name}
                    </h4>
                    {expandedTopics.includes(topic._id) ? (
                      <CiSquareMinus className="h-5 w-5 text-gray-600" />
                    ) : (
                      <CiSquarePlus className="h-5 w-5 text-gray-600" />
                    )}
                  </div>

                  {/* Nested Lessons */}
                  {expandedTopics.includes(topic._id) && (
                    <div className="mt-2 space-y-2">
                      {topic.lessons.map((lesson) => (
                        <div
                          key={lesson._id}
                          onClick={() =>
                            lesson.isAccessible && onSelectLesson(lesson)
                          }
                          className={`cursor-pointer p-2 flex items-center rounded-md ${
                            lesson.isAccessible
                              ? "bg-blue-100 hover:bg-blue-200"
                              : "bg-gray-200 cursor-not-allowed"
                          }`}
                        >
                          {/* Icon and Lesson Name */}
                          <span className="flex items-center space-x-3">
                            <span
                              className={`h-5 w-5 flex-shrink-0 rounded-full flex items-center justify-center ${
                                lesson.isAccessible
                                  ? "text-green-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {lesson.isAccessible ? (
                                <LockOpenIcon />
                              ) : (
                                <LockClosedIcon />
                              )}
                            </span>
                            <span className="text-sm text-gray-800">
                              {lesson.name}
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContentDetails;
