// AllOrders.tsx
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { queryClient } from "@/queryClientSetup";
import OrderTable from "./OrderTable"; // Updated to use OrderTable component
import { TOrder } from "./order.type"; // Updated to use TOrder type
import { orderColumns } from "./orderColumns";

// Fetch orders data (adjusted API endpoint for orders)
const fetchOrders = async (): Promise<TOrder[]> => {
  const response = await axiosInstance.get("/orders/get-all-orders-for-admin"); // Adjusted for orders
  return response.data.data;
};

// Delete an order (adjusted to work with orders)
const deleteOrder = async (orderId: string): Promise<void> => {
  await axiosInstance.delete(`/orders/delete-order/${orderId}`); // Adjusted endpoint for orders
};

const AllOrders = () => {
  const navigate = useNavigate();

  // Fetch orders using TanStack Query
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  // Handle order status
  const handleApprove = (orderId: string) => {
    console.log(orderId);
  };
  const handleDecline = (orderId: string) => {
    console.log(orderId);
  };
  const handleDelete = async () => {
    Swal.fire("Failed", "Currently Delete Isn't Available", "error");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h1>All Orders</h1>
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
