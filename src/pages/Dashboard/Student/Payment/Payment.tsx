import PaymentForm from "@/components/PaymentForm/PaymentForm";
import { useQueryClient } from "@tanstack/react-query";

type TBatch = {
  discountPrice: number;
  batchName: string;
  _id: string;
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
  console.log("finalPrice", finalPrice);

  return (
    <div className="h-[100%]">
      <div>
        <h1 className="text-center text-xl mb-5 overline">
          Proceed to Payment
        </h1>
        <h1 className="text-center mb-1">
          Item:{" "}
          <span className="font-bold">{paymentData?.batch?.batchName}</span>
        </h1>
        <h1 className="text-center mb-4">
          Price: <span className="font-bold">{finalPrice} BDT</span>
        </h1>
      </div>
      <div className="max-w-xl mx-auto my-5">
        <PaymentForm
          finalPrice={finalPrice}
          batchId={paymentData?.batch?._id}
        />
      </div>
    </div>
  );
};

export default Payment;
