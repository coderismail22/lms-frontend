import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import SubjectTable from "./SubjectTable";
import Swal from "sweetalert2";
import axiosInstance from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { subjectColumns } from "./subjectColumns";
import Loader from "@/components/Loader/Loader";

const fetchSubjects = async () => {
  const response = await axiosInstance.get("/subjects/get-all-subjects");
  return response.data.data;
};

const deleteSubject = async (subjectId: string) => {
  await axiosInstance.delete(`subjects/delete-subject/${subjectId}`);
};

const AllSubjects = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: subjects, isLoading } = useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
  });

  const mutation = useMutation({
    mutationFn: deleteSubject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      Swal.fire("Deleted!", "Subject deleted successfully!", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete subject.", "error");
    },
  });

  const handleDelete = (subjectId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(subjectId);
      }
    });
  };

  const handleEdit = (subjectId: string) => {
    navigate(`/dashboard/admin/subjects/edit/${subjectId}`);
  };

  if (isLoading) {
    <Loader />;
  }

  return (
    <div className="container mx-auto py-2">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        All Subjects
      </h1>
      <div className="my-4 flex justify-end">
        <Button
          onClick={() =>
            navigate("/dashboard/admin/subject-management/create-subject")
          }
          className="bg-gradient-to-tr from-[#6a82fb] to-[#fc5c7d]  hover:from-[#fc5c7d] hover:to-[#6a82fb]"
        >
          Create Subject
        </Button>
      </div>
      {subjects && (
        <SubjectTable
          data={subjects}
          columns={subjectColumns(handleEdit, handleDelete)}
        />
      )}
    </div>
  );
};

export default AllSubjects;
