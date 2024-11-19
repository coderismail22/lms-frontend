import { z } from "zod";

export const createBatchSchema = z.object({
  batchName: z.string().min(1, "Batch name is required"),
  courseName: z.string().min(1, "Course name is required"),
  couponCode: z.string().min(1, "Coupon code is required").optional(), // Optional but must be valid if provided
  discountPrice: z.coerce.number().optional(), // Automatically coerces to number
  maxStudentNumber: z.coerce
    .number()
    .min(1, "Max student number must be greater than 0"), // Automatically coerces to number
  batchImg: z.string().url("Image must be a valid URL").optional(),
  trainers: z
    .array(z.string().min(1, "Trainer name must not be empty"))
    .min(1, "At least one trainer is required"), // Array of non-empty strings
  startDate: z.string().refine((dateString) => !isNaN(Date.parse(dateString)), {
    message: "Start date must be a valid date (e.g., YYYY-MM-DD)",
  }),
  endDate: z.string().refine((dateString) => !isNaN(Date.parse(dateString)), {
    message: "End date must be a valid date (e.g., YYYY-MM-DD)",
  }),
});
// TODO: Validate startEnd date
// .refine((data) => Date.parse(data.startDate) < Date.parse(data.endDate), {
//   message: "Start date must be earlier than the end date",
//   path: ["startDate"], // Optional: Specifies where to attach the error
// });
