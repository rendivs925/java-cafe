import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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

// Sign-up schema extending the base schema
export const signUpSchema = baseUserSchema.extend({
  username: z
    .string()
    .min(1, "Username is required")
    .max(30, "Username cannot exceed 30 characters"),
});

// Add product schema for coffee shop owner
export const addProductSchema = z.object({
  title: z
    .string()
    .min(1, "Product title is required")
    .max(50, "Product title cannot exceed 50 characters"),
  price: z
    .number()
    .min(0.01, "Price must be at least $0.01")
    .max(9999.99, "Price cannot exceed $9999.99"),
  description: z
    .string()
    .max(200, "Description cannot exceed 200 characters")
    .optional(),
  category: z
    .string()
    .min(1, "Category is required")
    .max(30, "Category cannot exceed 30 characters"),
  stock: z
    .number()
    .min(1, "Stock must be at least 1")
    .max(9999, "Stock cannot exceed 9999")
    .default(1),
  productImage: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

// Define TypeScript type based on the sign-up schema
export type SignUpType = z.infer<typeof signUpSchema>;

// Define TypeScript type based on the base schema
export type BaseUserType = z.infer<typeof baseUserSchema>;

// Define TypeScript type based on the add product schema
export type AddProductType = z.infer<typeof addProductSchema>;
