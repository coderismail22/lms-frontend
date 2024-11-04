// src/components/ContentDetails/ContentDetails.tsx
import React, { useState } from "react";
import { Course, Subject, Topic, Lesson } from "@/types/course.type";

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

  // Toggle subject expansion
  const toggleSubject = (subjectId: string) => {
    setExpandedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  // Toggle topic expansion
  const toggleTopic = (topicId: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  return (
    <div className="bg-white shadow-md py-4 px-3 rounded-md w-[30%] overflow-y-scroll">
      {/* Course Overview */}
      <h2 className="text-2xl font-semibold ">{course.name}</h2>
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

      {/* Subjects */}
      {course.subjects.map((subject) => (
        <div key={subject._id} className="mt-4">
          <div
            onClick={() => toggleSubject(subject._id)}
            className="flex justify-between items-center cursor-pointer p-2 border-b border-gray-300"
          >
            <h3 className="text-lg font-medium">{subject.name}</h3>
            <span>{expandedSubjects.includes(subject._id) ? "-" : "+"}</span>
          </div>

          {/* Topics under each subject */}
          {expandedSubjects.includes(subject._id) &&
            subject.topics.map((topic) => (
              <div key={topic._id} className="ml-4 mt-2">
                <div
                  onClick={() => toggleTopic(topic._id)}
                  className="flex justify-between items-center cursor-pointer p-2 border-b border-gray-300"
                >
                  <h4 className="text-md font-medium">{topic.name}</h4>
                  <span>{expandedTopics.includes(topic._id) ? "↑" : "↓"}</span>
                </div>

                {/* Lessons under each topic */}
                {expandedTopics.includes(topic._id) &&
                  topic.lessons.map((lesson) => (
                    <div
                      key={lesson._id}
                      onClick={() => onSelectLesson(lesson)}
                      className="ml-6 mt-1 cursor-pointer text-gray-800 hover:text-blue-500"
                    >
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
