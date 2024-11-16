import { z } from "zod";
import { createTopicSchema } from "@/schemas/topic.schema";

// Type
export type TTopicForm = z.infer<typeof createTopicSchema>;
