export type TPayment = {
  _id: string; // Optional field for type inference outside the form
  userId: string; // Optional field for type inference outside the form
  name: string; // Name of the payer or payee
  paymentStatus: string; // Optional status of the payment
  payerNumber: string; // Payer's phone number (should only contain digits)
  payeeNumber: string; // Payee's phone number (should only contain digits)
  paymentMethod: string; // Method of payment (e.g., 'Credit Card', 'Paypal', etc.)
  amount: number; // Payment amount (must be greater than 0)
  transactionId: string; // Unique transaction identifier
  paymentDate: string; // Date of payment (should be a valid date string)
};
