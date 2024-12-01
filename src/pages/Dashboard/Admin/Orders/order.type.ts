export type TUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TPayment = {
  _id: string;
  userId: string;
  batchId: string;
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string;
  amount: number;
};

export type TOrder = {
  _id: string;
  userId: TUser; // Nested user data
  paymentId: TPayment; // Nested payment data
  orderDate: string; // Assuming it's a string representing the date
  status: string; // The order's status (e.g., 'pending', 'completed')
};
