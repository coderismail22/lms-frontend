import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import LessonTable from "./LessonTable"; // Table component for lessons
import Swal from "sweetalert2";
import axiosInstance from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { lessonColumns } from "./lessonColumns"; // Columns for lesson table
import Loader from "@/components/Loader/Loader";
import "../../../../../styles/swal.css";
// Fetch lessons from the API
const fetchLessons = async () => {
  const response = await axiosInstance.get("/lessons");
  return response.data.data; // Assuming `data` contains the lessons array
};

// Delete a lesson by ID
const deleteLesson = async (lessonId: string) => {
  await axiosInstance.delete(`/lessons/delete-lesson/${lessonId}`);
};

const AllLessons = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch all lessons
  const { data: lessons, isLoading } = useQuery({
    queryKey: ["lessons"],
    queryFn: fetchLessons,
  });

  // Delete lesson mutation
  const mutation = useMutation({
    mutationFn: deleteLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      Swal.fire({
        icon: "success",
        title: "Lesson Deleted",
        text: "Lesson deleted successfully!",
        customClass: {
          title: "custom-title",
          popup: "custom-popup",
          icon: "custom-icon",
          confirmButton: "custom-confirm-btn",
        },
      });
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete lesson.", "error");
    },
  });

  // Handle lesson deletion
  const handleDelete = (lessonId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      customClass: {
        title: "custom-title",
        popup: "custom-popup",
        icon: "custom-icon",
        confirmButton: "custom-confirm-btn",
        cancelButton: "custom-confirm-btn",
      },
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(lessonId);
      }
    });
  };

  // Handle lesson editing
  const handleEdit = (lessonId: string) => {
    navigate(`/dashboard/admin/lesson-management/lessons/edit/${lessonId}`);
  };

  if (isLoading) {
    <Loader />;
  }

  return (
    <div className="container mx-auto py-2">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        All Lessons
      </h1>
      <div className="my-4 flex justify-end">
        <Button
          className="bg-gradient-to-tr from-[#6a82fb] to-[#fc5c7d]  hover:from-[#fc5c7d] hover:to-[#6a82fb]"
          onClick={() =>
            navigate("/dashboard/admin/lesson-management/create-lesson")
          }
        >
          Create Lesson
        </Button>
      </div>
      {lessons && (
        <LessonTable
          data={lessons}
          columns={lessonColumns(handleEdit, handleDelete)}
        />
      )}
    </div>
  );
};

export default AllLessons;
