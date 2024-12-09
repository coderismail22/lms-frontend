import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import TopicTable from "./TopicTable";
import Swal from "sweetalert2";
import axiosInstance from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { topicColumns } from "./topicColumns";
import Loader from "@/components/Loader/Loader";

// Fetch topics from the API
const fetchTopics = async () => {
  const response = await axiosInstance.get("/topics");
  return response.data.data; // Assuming `data` contains the topics array
};

// Delete a topic by ID
const deleteTopic = async (topicId: string) => {
  await axiosInstance.delete(`/topics/delete-topic/${topicId}`);
};

const AllTopics = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch all topics
  const { data: topics, isLoading } = useQuery({
    queryKey: ["topics"],
    queryFn: fetchTopics,
  });

  // Delete topic mutation
  const mutation = useMutation({
    mutationFn: deleteTopic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
      Swal.fire("Deleted!", "Topic deleted successfully!", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete topic.", "error");
    },
  });

  // Handle topic deletion
  const handleDelete = (topicId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(topicId);
      }
    });
  };

  // Handle topic editing
  const handleEdit = (topicId: string) => {
    navigate(`/dashboard/admin/topics/edit/${topicId}`);
  };

  if (isLoading) {
    <Loader />;
  }

  return (
    <div className="container mx-auto py-2">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        All Topics
      </h1>
      <div className="my-4 flex justify-end">
        <Button
          onClick={() =>
            navigate("/dashboard/admin/topic-management/create-topic")
          }
          className="bg-gradient-to-tr from-[#6a82fb] to-[#fc5c7d]  hover:from-[#fc5c7d] hover:to-[#6a82fb]"
        >
          Create Topic
        </Button>
      </div>
      {topics && (
        <TopicTable
          data={topics}
          columns={topicColumns(handleEdit, handleDelete)}
        />
      )}
    </div>
  );
};

export default AllTopics;
