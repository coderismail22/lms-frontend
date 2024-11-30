import { useRole } from "@/hooks/useRole";
import { FullPopulatedCourse } from "@/types/fullCourseAndStudent.type";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";

// const CourseCard = (course: FullPopulatedCourse, studentId: string) => {
const CourseCard = ({
  course,
  studentId,
}: {
  course: FullPopulatedCourse;
  studentId: string;
}) => {
  const { courseId } = course;
  {
    console.log("course card", console.log(course));
    console.log("course card", console.log("studentId", studentId));
    // console.log("inside course card - populated courseId", console.log(course?.courseId));
    // console.log("inside course card - full course", JSON.stringify(course));
  }
  const navigate = useNavigate();
  const role = useRole();

  return (
    <Card
      onClick={() =>
        navigate(
          // TODO: make it fully dynamic (Role ok, get _id of the role)
          // `/dashboard/${role}/6731baa1f0897a87c9ca2e76/courses/${course._id}`
          `/dashboard/${role}/${studentId}/courses/${courseId._id}`
        )
      }
      className="cursor-pointer p-4 border rounded-lg shadow hover:shadow-lg hover:border hover:border-blue-50 transition overflow-auto bg-slate-400"
    >
      <h2 className="font-bold text-lg">{courseId._id}</h2>
      <h2 className="font-bold text-lg">{courseId?.name}</h2>
      <p className="text-sm text-gray-600">{courseId?.description}</p>
    </Card>
  );
};

export default CourseCard;
