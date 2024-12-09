import AppForm from "../CustomForm/AppForm";
import AppInput from "../CustomForm/AppInput";
import AppSelect from "../CustomForm/AppSelect";
import AppDatePicker from "../CustomForm/AppDatePicker";
import { paymentSchema } from "@/schemas/payment.schema";
import axiosInstance from "@/api/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/queryClientSetup";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { BackendErrorResponse } from "@/types/backendErrorResponse.type";
import { TPaymentForm } from "@/types/payment.type";
import { useNavigate } from "react-router-dom";
type TMakePaymentResponse = {
  success: boolean;
  message: string;
  data: {
    _id: string;
    __v: number;
  };
};

// Payment Handler
const submitPayment = async ({
  batchId,
  paymentData,
}: {
  batchId: string;
  paymentData: TPaymentForm;
}): Promise<TMakePaymentResponse> => {
  const response = await axiosInstance.post(
    `/payments/${batchId}`,
    paymentData
  );
  return response?.data;
};

const PaymentForm = ({
  finalPrice,
  batchId,
}: {
  finalPrice: number;
  batchId: string;
}) => {
  const navigate = useNavigate();
  const makePayment = useMutation({
    mutationFn: submitPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [""] });
      Swal.fire("Successful!", "Payment placed successfully.", "success");
      navigate("/dashboard/student/courses/enrolled-courses"); // Or redirect wherever after success
    },
    onError: (error: AxiosError<BackendErrorResponse>) => {
      console.error("Error adding item:", error);
      Swal.fire("Error!", `${error?.response?.data?.message}`, "error");
    },
  });

  // Handle form submission
  const onSubmit = (data: TPaymentForm) => {
    makePayment.mutate({ paymentData: data, batchId: batchId });
  };

  return (
    <div>
      <h1 className="text-red-500 font-bold text-sm text-right">
        Please fill up the form carefully.*
      </h1>
      <AppForm
        schema={paymentSchema}
        buttonText="Complete Payment"
        onSubmit={onSubmit}
        defaultValues={{
          name: "",
          payerNumber: "",
          payeeNumber: "01730481212",
          paymentMethod: "",
          amount: finalPrice,
          transactionId: "",
          paymentDate: "",
        }}
      >
        {/* Name */}
        <div className="mb-4">
          <AppInput
            label="Name"
            name="name"
            placeholder="Enter your full name"
          />
        </div>
        {/* Email */}
        {/* <div className="mb-4">
          <AppInput
            label="Email"
            name="email"
            placeholder="Enter your full name"
          />
        </div> */}
        {/* Payer Number */}
        <div className="mb-4">
          <AppInput
            label="Your Phone Number"
            name="payerNumber"
            placeholder="Enter your phone number"
          />
        </div>
        {/* Payee Number */}
        <div className="mb-4">
          <AppInput
            label="Payee Phone Number"
            name="payeeNumber"
            placeholder="Enter your phone number"
            isDisabled
          />
        </div>
        {/* Payment Method */}
        <div className="mb-4">
          <AppSelect
            label="Payment Method"
            name="paymentMethod"
            options={[
              { value: "bkash", label: "bKash" },
              { value: "rocket", label: "Rocket" },
              { value: "nagad", label: "Nagad" },
            ]}
          />
        </div>
        {/* Amount */}
        <div className="mb-4">
          <AppInput
            label="Amount"
            name="amount"
            placeholder="Enter the amount"
            isDisabled
          />
        </div>
        {/* Transaction ID */}
        <div className="mb-4">
          <AppInput
            label="Transaction ID"
            name="transactionId"
            placeholder="Enter your transaction ID"
          />
        </div>
        {/* Start Date */}
        <AppDatePicker
          name="paymentDate"
          label="Payment Date"
          placeholder="Select start date"
        />
      </AppForm>
    </div>
  );
};

export default PaymentForm;
