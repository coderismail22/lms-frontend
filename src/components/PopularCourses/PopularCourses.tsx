import SectionTitle from "../SectionTitle/SectionTitle";
import AppCourseCard from "../AppCourseCard/AppCourseCard";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import Loader from "../Loader/Loader";
import { TBatch } from "@/pages/Dashboard/Admin/Batch/AllBatchStudents/student.type";

const fetchBatches = async (): Promise<TBatch[]> => {
  const response = await axiosInstance.get("/batches");
  return response.data.data; // Assuming `data` contains the course array
};

const PopularCourses = () => {
  // Fetch batches
  const {
    data: batches,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["batches"],
    queryFn: fetchBatches,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    <p>Something went wrong ...</p>;
  }

  // Filter active batches
  const activeBatches =
    Array.isArray(batches) &&
    batches?.filter((batch: TBatch) => batch?.isActive);

  return (
    <div className="h-full font-siliguri my-7">
      <SectionTitle
        title={"জনপ্রিয় কোর্স সমূহ"}
        subtitle={
          "আমাদের সেরা কোর্সে জয়েন হয়ে আজ শুরু করুন আপনার স্মার্ট ক্যারিয়ার"
        }
      ></SectionTitle>

      <div className="grid items-center justify-center gap-4 grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  w-10/12 mx-auto">
        {Array.isArray(activeBatches) ? (
          activeBatches?.map((batch: TBatch) => (
            <AppCourseCard key={batch?._id} batch={batch} />
          ))
        ) : (
          <p className="text-center font-bold text-lg text-red-500">
            No courses available.
          </p>
        )}
      </div>
    </div>
  );
};

export default PopularCourses;
