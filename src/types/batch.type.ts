import { z } from "zod";
import { createBatchSchema } from "@/schemas/batch.schema";

// Type
export type TBatchForm = z.infer<typeof createBatchSchema>;
