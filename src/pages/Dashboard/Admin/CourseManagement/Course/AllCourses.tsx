import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { TCourse, courseColumns } from "./courseColumns";
import CourseTable from "./CourseTable";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";

const fetchCourses = async (): Promise<TCourse[]> => {
  const response = await axiosInstance.get("/courses/get-all-courses");
  return response.data.data; // Assuming `data` contains the course array
};

const deleteCourse = async (courseId: string): Promise<void> => {
  await axiosInstance.delete(`/courses/delete-course/${courseId}`);
};

const AllCourses = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch courses using TanStack Query
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  // Delete course mutation
  const mutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] }); // Refetch courses after deletion
      Swal.fire("Deleted!", "The course has been deleted.", "success");
    },
    onError: (error: any) => {
      console.error("Error deleting course:", error);
      Swal.fire("Error!", "Failed to delete course.", "error");
    },
  });

  // Handle Delete
  const handleDelete = async (courseId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(courseId); // Trigger delete mutation
      }
    });
  };

  // Handle Edit
  const handleEdit = (courseId: string) => {
    navigate(`/dashboard/admin/courses/edit/${courseId}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading courses. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto py-2">
      <h1 className="text-2xl font-bold mb-6 text-center underline">All Courses</h1>

      <div className="my-4 flex justify-end">
        <Button
          onClick={() =>
            navigate("/dashboard/admin/course-management/create-course")
          }
        >
          Create Course
        </Button>
      </div>
      {courses && (
        <CourseTable
          columns={courseColumns(handleEdit, handleDelete)}
          data={courses}
        />
      )}
    </div>
  );
};

export default AllCourses;
