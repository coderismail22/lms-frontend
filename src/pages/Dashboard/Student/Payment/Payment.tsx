import PaymentForm from "@/components/PaymentForm/PaymentForm";
import { useQueryClient } from "@tanstack/react-query";

type TBatch = {
  discountPrice: number;
  
};
const Payment = () => {
  const queryClient = useQueryClient();
  const paymentData = queryClient.getQueryData<{
    actualCoursePrice: number;
    batch: TBatch;
  }>(["paymentData"]);

  // Ensure paymentData is available
  if (!paymentData || !paymentData.batch) {
    return <div>Loading or Error: Payment data not found</div>;
  }

  const finalPrice =
    paymentData?.actualCoursePrice - paymentData?.batch?.discountPrice;
  console.log(finalPrice);
  // Amount to be paid
  // Batch Name

  return (
    <div className="h-[100%]">
      <div>
        <h1>Payment Page</h1>
      </div>
      <div className="max-w-xl mx-auto my-5">
        <PaymentForm />
      </div>
    </div>
  );
};

export default Payment;
