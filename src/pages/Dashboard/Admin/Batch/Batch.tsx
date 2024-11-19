import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

const fetchBatches = async () => {
  const response = await axiosInstance.get("/batches");
  return response.data;
};

const Batch = () => {
  // Fetch batches using React Query
  const {
    data: batches,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["batches"], // Unique query key
    queryFn: fetchBatches, // Fetch function
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link to="/dashboard/admin/batch/add-batch">
          <Button>Add Batch</Button>
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-4">Batch Cards</h1>

        {/* Loading State */}
        {isLoading && <p>Loading batches...</p>}

        {/* Error State */}
        {error && (
          <p className="text-red-500">
            Error loading batches. Please try again.
          </p>
        )}

        {/* Batches Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {batches?.data?.map((batch: any) => (
            <div
              key={batch._id}
              className="border rounded-lg shadow p-4 flex flex-col"
            >
              <h2 className="text-xl font-semibold mb-2">{batch.batchName}</h2>
              <p className="text-sm mb-2">
                <strong>Course:</strong> {batch.courseName}
              </p>
              <p className="text-sm mb-2">
                <strong>Trainers:</strong> {batch.trainers.join(", ")}
              </p>
              <p className="text-sm mb-2">
                <strong>Max Students:</strong> {batch.maxStudentNumber}
              </p>
              <p className="text-sm mb-2">
                <strong>Start Date:</strong> {batch.startDate}
              </p>
              <p className="text-sm mb-2">
                <strong>End Date:</strong> {batch.endDate}
              </p>
              <Button
                onClick={() => {
                  console.log(`Batch ID: ${batch._id}`);
                  refetch();
                }}
                variant="outline"
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Batch;
