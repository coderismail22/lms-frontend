import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { FaCartArrowDown } from "react-icons/fa";
import { queryClient } from "@/queryClientSetup";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { BackendErrorResponse } from "@/types/backendErrorResponse.type";
import { TBatchForm } from "@/types/batch.type";

const fetchCourseDetails = async (courseId: string) => {
  const { data } = await axiosInstance.get(`/courses/${courseId}/batches`);
  return data?.data;
};
// const enrollToTheBatchHandler = async (batchId: string) => {
//   const response = await axiosInstance.post(`/payments/${batchId}`, {
//     batchId,
//   });
//   return response;
// };

const CourseDetailsPageForAll = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  // Fetch course details using React Query
  const {
    data: courseData,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courseDetails", courseId],
    queryFn: () => fetchCourseDetails(courseId as string),
    enabled: !!courseId, // Only fetch if courseId is defined
  });

  // enroll Handler
  const handleEnroll = (batch: TBatchForm, actualCoursePrice: number) => {
    // Redirect to the payment page with batch info and price
    queryClient.setQueryData(["paymentData"], { batch, actualCoursePrice });
    navigate("/dashboard/student/paymentpage");
  };

  // const enrollToTheBatch = useMutation({
  //   mutationFn: enrollToTheBatchHandler,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: [""] });
  //     Swal.fire("Added!", "The item has been added.", "success");
  //   },
  //   // TODO: Define an error type
  //   onError: (error: AxiosError<BackendErrorResponse>) => {
  //     console.error("Error adding item:", error);
  //     Swal.fire("Error!", `${error?.response?.data?.message}`, "error");
  //   },
  // });

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

  return (
    <div className="container mx-auto p-6 h-[100%] ">
      {/* Course Details */}
      <Card className="mb-6 shadow-lg border bg-slate-500 ">
        <CardHeader>
          <CardTitle className="text-2xl text-white">
            {courseData.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-6 ">
            <img
              src={courseData.img}
              alt={courseData.name}
              className="w-full lg:w-1/3 rounded-lg shadow-md"
            />
            <div className="flex flex-col gap-4">
              <p className=" text-white">{courseData.description}</p>
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
      <div className="bg-slate-500 rounded-md p-5">
        {courseData?.batches?.length === 0 ? (
          <h3 className="text-xl font-bold text-white-500 ">
            Sorry, currently no batch is running for this course.
          </h3>
        ) : (
          <div>
            <h3 className="text-xl font-medium mb-4 text-center text-white overline">
              Available Batches:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseData.batches.map((batch: TBatchForm) => (
                <Card key={batch._id} className="shadow-lg border bg-slate-500">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium text-white">
                      {batch.batchName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <p className="text-white">
                        Start Date: {batch.startDate}
                      </p>
                      <p className="text-white">End Date: {batch.endDate}</p>
                      <p className="text-white">
                        Price: {batch.discountPrice || courseData.coursePrice}{" "}
                        BDT
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() =>
                        handleEnroll(batch, courseData?.coursePrice as string)
                      }
                      className="w-full bg-blue-500"
                      variant="default"
                    >
                      <FaCartArrowDown className="text-white" />
                      Enroll
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailsPageForAll;
