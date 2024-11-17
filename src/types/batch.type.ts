import { z } from "zod";
import { createBatchSchema } from "@/schemas/batch.schema";

// Type
export type TLessonForm = z.infer<typeof createBatchSchema>;
