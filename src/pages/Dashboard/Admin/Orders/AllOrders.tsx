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

  // Handle deleting an order
  const handleDelete = async (orderId: string) => {
    try {
      await deleteOrder(orderId);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      Swal.fire("Success", "Order deleted successfully", "success");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
      Swal.fire("Error", "Failed to delete order", "error");
    }
  };

  // Handle editing an order
  const handleEdit = (orderId: string) => {
    navigate(`/orders/edit/${orderId}`); // Redirect to order edit page (example route)
  };
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h1>All Orders</h1>
      {orders && (
        <OrderTable
          data={orders}
          columns={orderColumns(handleEdit, handleDelete)} // Pass handleEdit and handleDelete to OrderTable
        />
      )}
    </div>
  );
};

export default AllOrders;
