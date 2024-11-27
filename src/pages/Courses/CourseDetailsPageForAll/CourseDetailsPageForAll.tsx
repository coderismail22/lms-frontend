import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const fetchCourseDetails = async (courseId: string) => {
  const { data } = await axiosInstance.get(`/courses/${courseId}/batches`);
  return data;
};

const CourseDetailsPageForAll = () => {
  const { courseId } = useParams();

  // Fetch course details using React Query
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["courseDetails", courseId],
    queryFn: () => fetchCourseDetails(courseId as string),
    enabled: !!courseId, // Only fetch if courseId is defined
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <Skeleton className="h-72 w-full mb-4" />
        <Skeleton className="h-6 w-1/3 mb-4" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Error: {error.message || "Failed to fetch course details"}
      </div>
    );
  }

  const courseData = data?.data;

  return (
    <div className="container mx-auto p-6">
      {/* Course Details */}
      <Card className="mb-6 shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">
            {courseData.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-6">
            <img
              src={courseData.img}
              alt={courseData.name}
              className="w-full lg:w-1/3 rounded-lg shadow-md"
            />
            <div className="flex flex-col gap-4">
              <p className="text-gray-700">{courseData.description}</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{courseData.courseType}</Badge>
              </div>
              <p className="text-gray-800 font-semibold">
                Price: {courseData.coursePrice} BDT
              </p>
              <p className="text-gray-800 font-semibold">
                Course Length: {courseData.courseLength}
              </p>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Career Opportunities:
                </h3>
                <ul className="list-disc ml-5 text-gray-700">
                  {courseData.careerOpportunities.map(
                    (opportunity: string, index: number) => (
                      <li key={index}>{opportunity}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Batches */}
      <div>
        <h3 className="text-xl font-medium text-gray-900 mb-4">
          Available Batches
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseData.batches.map((batch: any) => (
            <Card key={batch._id} className="shadow-lg border">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-blue-600">
                  {batch.batchName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <p className="text-gray-700">Start Date: {batch.startDate}</p>
                  <p className="text-gray-700">End Date: {batch.endDate}</p>
                  <p className="text-gray-700">
                    Price: {batch.discountPrice || courseData.coursePrice} BDT
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPageForAll;
