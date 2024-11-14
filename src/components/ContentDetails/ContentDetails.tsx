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
    <div className="shadow-md py-4 px-3 rounded-md w-full">
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

      {course.subjects.map((subject) => (
        <div key={subject._id} className="mt-5">
          <div
            onClick={() => toggleSubject(subject._id)}
            className="cursor-pointer p-2 flex justify-between items-center"
          >
            <h3 className="text-lg font-medium">{subject.name}</h3>
            {expandedSubjects.includes(subject._id) ? (
              <CiSquareMinus className="h-5 w-5 text-gray-600" />
            ) : (
              <CiSquarePlus className="h-5 w-5 text-gray-600" />
            )}
          </div>
          {expandedSubjects.includes(subject._id) &&
            subject.topics.map((topic) => (
              <div key={topic._id} className="ml-4 mt-2">
                <div
                  onClick={() => toggleTopic(topic._id)}
                  className="cursor-pointer p-2 flex justify-between items-center"
                >
                  <h4 className="text-md font-medium">{topic.name}</h4>
                  {expandedTopics.includes(topic._id) ? (
                    <CiSquareMinus className="h-5 w-5 text-gray-600" />
                  ) : (
                    <CiSquarePlus className="h-5 w-5 text-gray-600" />
                  )}
                </div>
                {expandedTopics.includes(topic._id) &&
                  topic.lessons.map((lesson) => (
                    <div
                      key={lesson._id}
                      onClick={() =>
                        lesson.isAccessible && onSelectLesson(lesson)
                      }
                      className={`ml-6 mt-1 cursor-pointer flex items-center ${
                        lesson.isAccessible
                          ? "text-gray-800"
                          : "text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {lesson.isAccessible ? (
                        <LockOpenIcon className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <LockClosedIcon className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <p>{lesson.name}</p>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default ContentDetails;
