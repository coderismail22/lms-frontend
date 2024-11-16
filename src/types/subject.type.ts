import { createSubjectSchema } from "@/schemas/subject.schema";
import { z } from "zod";

export type TSubjectForm = z.infer<typeof createSubjectSchema>;
