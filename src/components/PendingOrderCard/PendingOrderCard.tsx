import React from "react";

interface Payment {
  paymentMethod: string;
  amount: number;
  transactionId: string;
}

interface Batch {
  batchName: string;
  courseName: string;
  batchImg: string;
}

interface PendingOrderCardProps {
  orderId: string;
  batch: Batch;
  payment: Payment;
  orderStatus: string;
}

const PendingOrderCard: React.FC<PendingOrderCardProps> = ({
  batch,
  payment,
  orderStatus,
}) => {
  return (
    <div className="border p-4 rounded-md shadow-md bg-white">
      <div className="flex justify-between">
        <h3 className="text-xl font-bold">{batch?.batchName}</h3>
        <span
          className={`px-3 py-1 rounded-md text-white ${
            orderStatus === "Pending" ? "bg-yellow-500" : "bg-green-500"
          }`}
        >
          {orderStatus}
        </span>
      </div>
      <p className="text-lg font-semibold text-gray-700">{batch?.courseName}</p>
      <div className="mt-4">
        <img
          src={batch?.batchImg}
          alt={batch?.batchName}
          className="w-full h-40 object-cover rounded-md"
        />
      </div>
      <div className="mt-4">
        <p>
          <strong>Payment Method:</strong> {payment?.paymentMethod}
        </p>
        <p>
          <strong>Amount:</strong> {payment?.amount} BDT
        </p>
        <p>
          <strong>Transaction ID:</strong> {payment?.transactionId}
        </p>
      </div>
    </div>
  );
};

export default PendingOrderCard;
