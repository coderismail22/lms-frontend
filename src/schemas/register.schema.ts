import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Full Name is required"),
    email: z
      .string()
      .email("Invalid email format")
      .min(1, "Email is required")
      .transform((email) => email.toLowerCase()),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });
