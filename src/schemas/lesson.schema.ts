import { z } from "zod";

// Schema
export const createLessonSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  type: z.string().min(1, "Content type is required"),
  content: z.string().url("Content is must be valid URL"),
});
