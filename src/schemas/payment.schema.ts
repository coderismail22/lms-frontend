import { z } from "zod";

export const paymentSchema = z.object({
  _id: z.string().optional(), // only for type inference outside form
  userId: z.string().optional(), // only for type inference outside form
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be less than 50 characters"),
  paymentStatus: z.string().optional(), // only for type inference outside form
  // email: z.string(),
  payerNumber: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits"),
  payeeNumber: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  transactionId: z.string(),
  paymentDate: z
    .string()
    .refine((dateString) => !isNaN(Date.parse(dateString)), {
      message: "Start date must be a valid date (e.g., YYYY-MM-DD)",
    }),
});
