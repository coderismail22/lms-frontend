import AppForm from "../CustomForm/AppForm";
import AppInput from "../CustomForm/AppInput";
import AppSelect from "../CustomForm/AppSelect";
import AppDatePicker from "../CustomForm/AppDatePicker";
import { paymentSchema } from "@/schemas/payment.schema";

const PaymentForm = () => {
  // Form submission handler
  const handlePaymentSubmit = (paymentData: any) => {
    console.log("payment data", paymentData);
  };

  return (
    <div>
      <h1 className="text-center mb-4">Proceed to Payment</h1>
      <AppForm
        schema={paymentSchema}
        buttonText="Complete Payment"
        onSubmit={handlePaymentSubmit}
        defaultValues={{
          name: "Ismail",
          phoneNumber: "01756434489",
          paymentMethod: "",
          amount: 10,
          tnxId: "123456789",
          paymentDate: "2024-12-28",
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
        {/* Phone Number */}
        <div className="mb-4">
          <AppInput
            label="Phone Number"
            name="phoneNumber"
            placeholder="Enter your phone number"
          />
        </div>
        {/* Payment Method */}
        <div className="mb-4">
          <AppSelect
            label="Payment Method"
            name="paymentMethod"
            options={[
              { value: "Bkash", label: "bKash" },
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
          />
        </div>
        {/* Transaction ID */}
        <div className="mb-4">
          <AppInput
            label="Transaction ID"
            name="tnxId"
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
