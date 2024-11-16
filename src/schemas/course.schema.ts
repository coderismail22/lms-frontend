import { z } from "zod";

export const createCourseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  language: z.string().min(1, "Language is required"),
  batch: z.string().min(1, "Batch is required"),
  courseType: z.string().min(1, "Course type is required"),
  coursePrice: z.coerce.number().min(1, "Price must be greater than 0"), // Automatically coerces to number
  courseLength: z.string().min(1, "Course length is required"),
  skillLevel: z.string().min(1, "Skill level is required"),
  careerOpportunities: z.array(z.string()),
  curriculum: z.array(z.string()),
  jobPositions: z.array(z.string()),
  softwareList: z.array(z.string()),
});
