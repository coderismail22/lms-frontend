import { z } from "zod";
import { createLessonSchema } from "@/schemas/lesson.schema";

// Type
export type TLessonForm = z.infer<typeof createLessonSchema>;
