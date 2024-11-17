import { z } from "zod";

// Schema
export const createSubjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});