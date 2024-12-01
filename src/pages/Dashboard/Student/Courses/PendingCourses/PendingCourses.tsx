import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import PendingOrderCard from "@/components/PendingOrderCard/PendingOrderCard";
import { TFullPopulatedOrder } from "./pendingOrder.type";

// Fetch pending courses
const fetchPendingOrders = async () => {
  const { data } = await axiosInstance.get(`/orders/`); // Adjust the endpoint to fetch only pending courses
  const response = data?.data;
  return response;
};

const PendingOrders = () => {
  // Fetch pending orders
  const {
    data: orders,
    isLoading: isOrderLoading,
    error: courseError,
  } = useQuery({
    queryKey: ["pendingOrders"],
    queryFn: fetchPendingOrders,
  });

  if (isOrderLoading) return <p>Loading...</p>;
  if (courseError)
    return <p>{courseError ? courseError?.message : "An error occurred"}</p>;
  console.log(orders);
  // Filter out approved orders
  const pendingOrders = orders.filter(
    (order: TFullPopulatedOrder) => order.orderStatus === "Pending"
  );
  return (
    <div>
      <h1>Pending Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pendingOrders?.length === 0 && <p>No pending courses</p>}
        {pendingOrders?.map((order: TFullPopulatedOrder) => (
          <PendingOrderCard
            key={order._id}
            orderId={order._id}
            batch={order.paymentId.batchId}
            payment={{
              paymentMethod: order.paymentId.paymentMethod,
              amount: order.paymentId.amount,
              transactionId: order.paymentId.transactionId,
            }}
            orderStatus={order.orderStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default PendingOrders;
