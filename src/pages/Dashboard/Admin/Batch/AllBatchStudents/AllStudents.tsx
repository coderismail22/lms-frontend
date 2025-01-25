/* eslint-disable @typescript-eslint/no-unused-vars */
// AllOrders.tsx
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import StudentTable from "./StudentTable";
import { studentColumns } from "./studentColumns";
import { TBatch } from "./student.type";
import { queryClient } from "@/queryClientSetup";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { BackendErrorResponse } from "@/types/backendErrorResponse.type";
import Loader from "@/components/Loader/Loader";

const fetchBatch = async (batchId: string): Promise<TBatch> => {
  const { data } = await axiosInstance.get(`/batches/${batchId}`); // Adjusted for orders
  return data?.data;
};

// const viewFullDetails = async (studentId: string) => {
//   console.log("studentId", studentId);
// const response = await axiosInstance.post(`/orders/approve/${studentId}`);
// return response.data;
// };

const blockStudent = async (_studentId: string) => {
  // const response = await axiosInstance.post(`/orders/decline/${studentId}`);
  // return response.data;
};
const unblockStudent = async (_studentId: string) => {
  // const response = await axiosInstance.post(`/orders/decline/${studentId}`);
  // return response.data;
};

const deleteStudent = async (_studentId: string) => {
  // const response = await axiosInstance.delete(`/orders/delete/${studentId}`);
  // return response.data;
};

const AllStudents = ({ batchId }: { batchId: string }) => {
  // Fetch specific batch
  const {
    data: batch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["batch"],
    queryFn: () => fetchBatch(batchId),
  });

  // Fetch specific batch
  // const {
  //   data: student,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["batch"],
  //   queryFn: () => viewFullDetails(studentId),
  // });

  // Mutation for block
  const blockMutation = useMutation({
    mutationFn: blockStudent,
    onSuccess: () => {
      // Invalidate and refetch orders after mutation is successful
      queryClient.invalidateQueries({ queryKey: ["students"] });
      Swal.fire("Blocked", "Student has been blocked.", "success");
    },
    onError: (error: AxiosError<BackendErrorResponse>) => {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    },
  });

  // Mutation for unblock
  const unblockMutation = useMutation({
    mutationFn: unblockStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      Swal.fire("Unblocked", "Student has been unblocked", "success");
    },
    onError: (error: AxiosError<BackendErrorResponse>) => {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    },
  });

  // Mutation for delete
  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      Swal.fire("Deleted", "Student has been deleted", "success");
    },
    onError: (error: AxiosError<BackendErrorResponse>) => {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    },
  });

  const handleBlock = (studentId: string) => {
    blockMutation.mutate(studentId); // Trigger handleBlock mutation
  };

  const handleUnblock = (studentId: string) => {
    unblockMutation.mutate(studentId); // Trigger handleUnblock mutation
  };

  const handleDelete = (studentId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(studentId); // Trigger delete mutation
      }
    });
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      {batch && (
        <StudentTable
          data={batch?.enrolledStudents}
          columns={studentColumns(handleBlock, handleUnblock, handleDelete)}
        />
      )}
    </div>
  );
};

export default AllStudents;
