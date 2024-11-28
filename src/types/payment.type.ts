import { paymentSchema } from "@/schemas/payment.schema";
import { z } from "zod";

export type TPaymentForm = z.infer<typeof paymentSchema>;
