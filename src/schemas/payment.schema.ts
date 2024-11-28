import { z } from "zod";

export const paymentSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be less than 50 characters"),
  phoneNumber: z
    .string()
    .length(11, "Phone number must be exactly 11 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  tnxId: z
    .string()
    .min(10, "Transaction ID must be at least 10 characters")
    .max(20, "Transaction ID must not exceed 20 characters"),
  paymentDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .transform((val) => new Date(val)),
});
