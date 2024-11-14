import { useRole } from "@/hooks/useRole";
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
  {
    console.log("inside course card - full course", course);
  }
  {
    console.log("inside course card - course id", course._id);
  }
  {
    console.log("inside course card - course name", course.name);
  }
  {
    console.log("inside course card - course desc", course.description);
  }
  const navigate = useNavigate();
  const role = useRole();

  return (
    <div
      onClick={() =>
        navigate(
          // TODO: make it fully dynamic
          `/dashboard/${role}/6731baa1f0897a87c9ca2e76/courses/${course._id}`
        )
      }
      className="cursor-pointer p-4 border rounded-lg shadow hover:shadow-lg hover:border hover:border-blue-50 transition"
    >
      <h2 className="font-bold text-lg">{course.name}</h2>
      <p className="text-sm text-gray-600">{course.description}</p>
    </div>
  );
};

export default CourseCard;
