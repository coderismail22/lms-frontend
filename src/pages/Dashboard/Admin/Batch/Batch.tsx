import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import BatchCard from "@/components/BatchCard/BatchCard";
import Swal from "sweetalert2";

// Fetch batches
const fetchBatches = async () => {
  const response = await axiosInstance.get("/batches");
  return response.data;
};

// Delete batch function
const deleteBatch = async (batchId: string): Promise<void> => {
  await axiosInstance.delete(`/batches/${batchId}`);
};

const Batch = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const handleEdit = (batchId: string) => {
    navigate(`/dashboard/admin/batch/edit/${batchId}`);
  };

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

  // Mutation for deleting a batch
  const deleteMutation = useMutation({
    mutationFn: deleteBatch,
    onSuccess: () => {
      Swal.fire("Deleted!", "Batch has been deleted.", "success");
      queryClient.invalidateQueries({ queryKey: ["batches"] }); // Refetch batches
    },
    onError: (error: any) => {
      console.error("Error deleting batch:", error);
      Swal.fire("Error!", "Failed to delete batch.", "error");
    },
  });

  // Function to handle batch deletion
  const handleDelete = (batchId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(batchId);
      }
    });
  };

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
            <BatchCard
              key={batch._id}
              image={batch.batchImg || "https://via.placeholder.com/150"} // Fallback if no image
              courseName={batch.courseName}
              batch={batch.batchName}
              batchID={batch._id}
              onEdit={() => handleEdit(batch._id)}
              onDelete={() => handleDelete(batch._id)}
              onViewStudents={() =>
                console.log(`View students in batch ID: ${batch._id}`)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Batch;
