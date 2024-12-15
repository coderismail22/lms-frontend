import { useRole } from "@/hooks/useRole";
import { FullPopulatedCourse } from "@/types/fullCourseAndStudent.type";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { FaPlay } from "react-icons/fa";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

// const CourseCard = (course: FullPopulatedCourse, studentId: string) => {
const CourseCard = ({
  course,
  studentId,
}: {
  course: FullPopulatedCourse;
  studentId: string;
}) => {
  const { courseId } = course;

  const navigate = useNavigate();
  const role = useRole();

  return (
    <Card className="max-w-[250px]  bg-gradient-to-r from-blue-500 via-indigo-500 to-indigo-400 shadow-xl overflow-hidden flex flex-col justify-between h-full border-none">
      <div className="flex-grow">
        <figure>
          <img
            className="w-full h-[200px] object-cover object-center"
            src={course?.courseId?.img}
            alt="course"
          />
        </figure>
        <div className="flex flex-col items-center justify-center m-2">
          <Badge variant="destructive" className="text-white ">
            <Link to="#">{course?.courseId?.courseType}</Link>
          </Badge>
        </div>

        <h2 className="font-bold text-3xl text-white text-center font-siliguri">
          {courseId?.name}
        </h2>
      </div>
      <CardContent className="p-1">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center  cursor-pointer bg-gradient-to-tr  from-cyan-500 to-blue-500 hover:bg-gradient-tr hover:from-[#c4f2fa] hover:to-blue-500 text-white"
          onClick={() =>
            navigate(`/dashboard/${role}/${studentId}/courses/${courseId._id}`)
          }
        >
          <FaPlay className="mr-2  " />
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
