import { z } from "zod";

export const createBatchSchema = z
  .object({
    batchName: z.string().min(1, "Batch name is required"),
    courseName: z.string().min(1, "Course name is required"),
    couponCode: z.string().min(1, "Coupon code is required").optional(), // Optional but must be valid if provided
    discountPrice: z.coerce
      .number()
      .min(1, "Discount price must be greater than 0"), // Automatically coerces to number
    maxStudentNumber: z.coerce
      .number()
      .min(1, "Maximum student number must be greater than 0"), // Automatically coerces to number
    content: z.string().url("Content must be a valid URL"),
    trainers: z
      .array(z.string().min(1, "Trainer name must not be empty"))
      .min(1, "At least one trainer is required"), // Array of non-empty strings
    startDate: z.string().refine(
      (date) => !isNaN(Date.parse(date)), // Validates the date format
      {
        message: "Start date must be a valid date (e.g., YYYY-MM-DD)",
      }
    ),
    endDate: z.string().refine(
      (date) => !isNaN(Date.parse(date)), // Validates the date format
      {
        message: "End date must be a valid date (e.g., YYYY-MM-DD)",
      }
    ),
  })
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      return end > start;
    },
    {
      message: "End date must be later than start date",
      path: ["endDate"],
    }
  );
