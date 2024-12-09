// AllOrders.tsx
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axiosInstance from "@/api/axiosInstance";
import { queryClient } from "@/queryClientSetup";
import OrderTable from "./OrderTable"; // Updated to use OrderTable component
import { TOrder } from "./order.type"; // Updated to use TOrder type
import { orderColumns } from "./orderColumns";
import { AxiosError } from "axios";
import { BackendErrorResponse } from "@/types/backendErrorResponse.type";
import Loader from "@/components/Loader/Loader";

const fetchOrders = async (): Promise<TOrder[]> => {
  const response = await axiosInstance.get("/orders/get-all-orders-for-admin"); // Adjusted for orders
  return response.data.data;
};

const approveOrder = async (orderId: string) => {
  const response = await axiosInstance.post(`/orders/approve/${orderId}`);
  return response.data;
};

const declineOrder = async (orderId: string) => {
  const response = await axiosInstance.post(`/orders/decline/${orderId}`);
  return response.data;
};

const deleteOrder = async (orderId: string) => {
  const response = await axiosInstance.delete(`/orders/delete/${orderId}`);
  return response.data;
};

const AllOrders = () => {
  // Fetch orders using TanStack Query
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  // Mutation for approve
  const approveMutation = useMutation({
    mutationFn: approveOrder,
    onSuccess: () => {
      // Invalidate and refetch orders after mutation is successful
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      Swal.fire("Approved", "Order has been approved", "success");
    },
    onError: (error: AxiosError<BackendErrorResponse>) => {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    },
  });

  // Mutation for decline
  const declineMutation = useMutation({
    mutationFn: declineOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      Swal.fire("Declined", "Order has been declined", "error");
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
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      Swal.fire("Deleted", "Order has been deleted", "success");
    },
    onError: (error: AxiosError<BackendErrorResponse>) => {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    },
  });

  const handleApprove = (orderId: string) => {
    approveMutation.mutate(orderId); // Trigger approve mutation
  };

  const handleDecline = (orderId: string) => {
    declineMutation.mutate(orderId); // Trigger decline mutation
  };

  const handleDelete = (orderId: string) => {
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
        deleteMutation.mutate(orderId); // Trigger delete mutation
      }
    });
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">All Orders</h1>
      {orders && (
        <OrderTable
          data={orders}
          columns={orderColumns(handleApprove, handleDecline, handleDelete)} // Pass handleEdit and handleDelete to OrderTable
        />
      )}
    </div>
  );
};

export default AllOrders;
