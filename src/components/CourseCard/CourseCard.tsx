import { useRole } from "@/hooks/useRole";
import { FullPopulatedCourse } from "@/types/fullCourseAndStudent.type";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../ui/card";
import { FaPlay } from "react-icons/fa";
import { Button } from "../ui/button";

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
    <Card className="p-2 border border-blue-500 rounded-lg shadow hover:shadow-lg  transition w-full bg-[#DBEBFE] grid flex-col md:flex-row">
      <CardHeader className="p-1">
        <img className="rounded-md" src={courseId?.img} alt={courseId?.name} />
      </CardHeader>
      <CardContent className="p-1">
        <h2 className="font-bold text-lg text-center">{courseId?.name}</h2>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center hover:bg-blue-200 cursor-pointer"
          onClick={() =>
            navigate(`/dashboard/${role}/${studentId}/courses/${courseId._id}`)
          }
        >
          <FaPlay className="mr-2 text-blue-400" />
          Continue Course
        </Button>

        {/* TODO: Make outline button */}
        {/* <Button
          variant="outline"
          className="w-full flex items-center justify-center"
        >
          <FaBookOpen className="mr-2" />
          Course Outline
        </Button> */}

        {/* TODO: Make progress bar functional */}
        {/* <Progress value={50} className="mt-2" /> */}
      </CardContent>
    </Card>
  );
};

export default CourseCard;
