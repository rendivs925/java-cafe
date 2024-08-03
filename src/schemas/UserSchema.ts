import { z } from "zod";

// Base user schema for common fields
export const baseUserSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .max(30, "Email cannot exceed 30 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(30, "Password cannot exceed 30 characters"),
});

// Define TypeScript type based on the base schema
export type BaseUserType = z.infer<typeof baseUserSchema>;
