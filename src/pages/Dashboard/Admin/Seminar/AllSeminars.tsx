// AllSeminars.tsx

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import SeminarTable from "./SeminarTable";
import Swal from "sweetalert2";
import axiosInstance from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { seminarColumns } from "./seminarColumns";
import Loader from "@/components/Loader/Loader";

//  Fetch seminars from the API

const fetchSeminars = async () => {
  const response = await axiosInstance.get("/seminar");
  // Assuming data is in response.data.data
  return response.data.data;
};

//  Delete a seminar by ID
const deleteSeminar = async (seminarId: string) => {
  await axiosInstance.delete(`/seminar/${seminarId}`);
};

const AllSeminars = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch all seminars
  const { data: seminars, isLoading } = useQuery({
    queryKey: ["seminars"],
    queryFn: fetchSeminars,
  });

  // Delete seminar mutation
  const mutation = useMutation({
    mutationFn: deleteSeminar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seminars"] });
      Swal.fire("Deleted!", "Seminar deleted successfully!", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete seminar.", "error");
    },
  });

  // Handle seminar deletion
  const handleDelete = (seminarId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(seminarId);
      }
    });
  };

  // Handle seminar editing
  const handleEdit = (seminarId: string) => {
    navigate(`/dashboard/admin/seminar/edit-seminar/${seminarId}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto py-2">
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">
        All Seminars
      </h1>
      <div className="my-4 flex justify-end">
        <Button
          onClick={() => navigate("/dashboard/admin/seminar/add-seminar")}
          className="bg-gradient-to-tr from-[#6a82fb] to-[#fc5c7d] hover:from-[#fc5c7d] hover:to-[#6a82fb]"
        >
          Add Seminar
        </Button>
      </div>
      {seminars && (
        <SeminarTable
          data={seminars}
          columns={seminarColumns(handleEdit, handleDelete)}
        />
      )}
    </div>
  );
};

export default AllSeminars;
