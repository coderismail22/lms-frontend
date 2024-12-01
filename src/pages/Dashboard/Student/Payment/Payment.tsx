import PaymentForm from "@/components/PaymentForm/PaymentForm";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const {batch,actualCoursePrice} = location.state || {};
  console.log(batch,actualCoursePrice);
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
