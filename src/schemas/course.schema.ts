import { z } from "zod";

export const createCourseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  language: z.string().min(1, "Language is required"),
  courseType: z.string().min(1, "Course type is required"),
  coursePrice: z.coerce.number().min(1, "Price must be greater than 0"),
  courseLength: z.string().min(1, "Course length is required"),
  skillLevel: z.string().min(1, "Skill level is required"),
  subjects: z.array(z.string()).min(1, "At least one subject is required"),
  careerOpportunities: z.array(z.string()).optional(),
  curriculum: z.array(z.string()).optional(),
  jobPositions: z.array(z.string()).optional(),
  softwareList: z.array(z.string()).optional(),
});
