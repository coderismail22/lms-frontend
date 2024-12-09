// AllPayments.tsx
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { queryClient } from "@/queryClientSetup";
import PaymentTable from "./PaymentTable";
import { paymentColumns } from "./paymentColumns";
import { TPayment } from "./payment.type";
import Loader from "@/components/Loader/Loader";

const fetchPayments = async (): Promise<TPayment[]> => {
  const response = await axiosInstance.get("/payments/get-all-payments");
  return response.data.data;
};

const deletePayment = async (paymentId: string): Promise<void> => {
  await axiosInstance.delete(`/payments/delete-payment/${paymentId}`);
};

const AllPayments = () => {
  const navigate = useNavigate();

  // Fetch payments
  const {
    data: payments,
    isLoading,
    error,
  } = useQuery({ queryKey: ["payments"], queryFn: fetchPayments });

  // Handle deleting payment
  const handleDelete = async (paymentId: string) => {
    try {
      await deletePayment(paymentId);
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      Swal.fire("Success", "Payment deleted successfully", "success");
      //   TODO: make a type for error
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Swal.fire("Error", "Failed to delete payment", "error");
      console.error("Error deleting payment:", err);
    }
  };

  // Handle Edit
  const handleEdit = (courseId: string) => {
    navigate(`/dashboard/admin/courses/edit/${courseId}`);
  };
  if (isLoading) {
    <Loader />;
  }
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center underline underline-offset-8 text-blue-500">All Payments</h1>
      {payments && (
        <PaymentTable
          columns={paymentColumns(handleDelete, handleEdit)}
          data={payments}
        />
      )}
    </div>
  );
};

export default AllPayments;
