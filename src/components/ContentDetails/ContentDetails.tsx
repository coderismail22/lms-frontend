import React, { useState } from "react";
import { Course, Lesson } from "@/types/course.type";
import { LockOpenIcon } from "lucide-react";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

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

  return (
    <div className="shadow-md py-4 px-3 rounded-md w-full overflow-y-auto max-h-[80vh]">
      <h2 className="text-2xl font-semibold">{course.name}</h2>
      <p className="text-gray-600">
        Total Lessons:{" "}
        {course.subjects.reduce(
          (total, subj) =>
            total +
            subj.topics.reduce(
              (subTotal, topic) => subTotal + topic.lessons.length,
              0
            ),
          0
        )}
      </p>
      {/* s */}
      {course.subjects.map((subject) => (
        <div
          key={subject._id}
          className="mt-5 p-4 border border-gray-300 rounded-lg shadow-lg bg-gradient-to-r from-[#abf4de] via-[#c5e5f5] to-[#abf4de]"
        >
          {/* Subject Card */}
          <div
            onClick={() => toggleSubject(subject._id)}
            className="cursor-pointer p-4 flex justify-between items-center rounded-md bg-[#6fb1d2] hover:bg-[#5a99b7] transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {subject.name}
            </h3>
            {expandedSubjects.includes(subject._id) ? (
              <CiSquareMinus className="h-6 w-6 text-gray-600 transition-transform duration-200 transform rotate-180" />
            ) : (
              <CiSquarePlus className="h-6 w-6 text-gray-600 transition-transform duration-200" />
            )}
          </div>

          {/* Nested Topics */}
          <div
            className={`transition-all duration-500 overflow-hidden ${
              expandedSubjects.includes(subject._id)
                ? "max-h-[500px]"
                : "max-h-0"
            }`}
          >
            {expandedSubjects.includes(subject._id) &&
              subject.topics.map((topic) => (
                <div
                  key={topic._id}
                  className="mt-3 p-3 border-l-4 border-l-yellow-500 bg-gradient-to-r from-teal-50 via-blue-50 to-teal-100 shadow-md pl-6"
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
                      <CiSquareMinus className="h-5 w-5 text-gray-600 transition-transform duration-200 transform rotate-180" />
                    ) : (
                      <CiSquarePlus className="h-5 w-5 text-gray-600 transition-transform duration-200" />
                    )}
                  </div>

                  {/* Nested Lessons */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      expandedTopics.includes(topic._id)
                        ? "max-h-[300px]"
                        : "max-h-0"
                    }`}
                  >
                    {expandedTopics.includes(topic._id) &&
                      topic.lessons.map((lesson) => (
                        <div
                          key={lesson._id}
                          onClick={() =>
                            lesson.isAccessible && onSelectLesson(lesson)
                          }
                          className={`mt-2 cursor-pointer flex items-center rounded-md p-3 transition-all duration-300 ${
                            lesson.isAccessible
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {lesson.isAccessible ? (
                            <LockOpenIcon className="size-7 font-bold text-green-500 mr-2" />
                          ) : (
                            <LockClosedIcon className="size-7 text-red-500 mr-2" />
                          )}
                          <p>{lesson.name}</p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      {/* e */}
    </div>
  );
};

export default ContentDetails;
