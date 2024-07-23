import { z } from "zod";

// Base user schema for common fields
export const baseUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// Sign-up schema extending the base schema
export const signUpSchema = baseUserSchema.extend({
  username: z.string().min(1, "Username is required"),
});

// Define TypeScript type based on the sign-up schema
export type SignUpType = z.infer<typeof signUpSchema>;

// Define TypeScript type based on the base schema
export type BaseUserType = z.infer<typeof baseUserSchema>;
