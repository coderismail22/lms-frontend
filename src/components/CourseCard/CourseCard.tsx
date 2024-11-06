import React from "react";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  course: {
    _id: string;
    name: string;
    description: string;
  };
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/dashboard/test/courses/${course._id}`)}
      className="cursor-pointer p-4 border rounded-lg shadow hover:shadow-lg hover:border hover:border-blue-50 transition"
    >
      <h2 className="font-bold text-lg">{course.name}</h2>
      <p className="text-sm text-gray-600">{course.description}</p>
    </div>
  );
};

export default CourseCard;
