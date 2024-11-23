import { z } from "zod";

// Schema
export const createSubjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  topics: z.array(z.string()).min(1, "At least one topic is required"),
});
// Schema
export const updateSubjectSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  topics: z
    .array(z.string())
    .min(1, "At least one topic is required")
    .optional(),
});
