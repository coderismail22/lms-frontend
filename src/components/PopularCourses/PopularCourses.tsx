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

  return (
    <div className="h-full font-siliguri bg-[#1D232A] my-7">
      <SectionTitle
        title={"জনপ্রিয় কোর্স সমূহ"}
        subtitle={
          "আমাদের সেরা কোর্সে জয়েন হয়ে আজ শুরু করুন আপনার স্মার্ট ক্যারিয়ার"
        }
      ></SectionTitle>

      <div className="max-w-sm md:max-w-4xl grid items-center justify-center gap-4 grid-cols-1  md:grid-cols-2 lg:grid-cols-3  w-[90%] mx-auto ">
        {Array.isArray(batches) ? (
          batches.map((batch: TBatch) => (
            <AppCourseCard key={batch._id} batch={batch} />
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
    </div>
  );
};

export default PopularCourses;
