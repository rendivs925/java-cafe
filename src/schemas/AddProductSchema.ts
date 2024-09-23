import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/constanst";
import { z } from "zod";

// Add product schema for coffee shop owner
export const addProductSchema = z.object({
  _id: z.string().optional(),
  createdAt: z.date().optional(),
  title: z
    .string()
    .min(1, "Product title is required")
    .max(50, "Product title cannot exceed 50 characters"),
  price: z.coerce.number().min(1000, "Price must be at least IDR 1K"),
  capital: z.coerce.number().min(1000, "Capital must be at least IDR 1K"),
  profit: z.coerce.number(),
  weight: z.coerce.number().min(1, "Weight must be at least 1g"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(95, "Description cannot exceed 95 characters"),
  category: z
    .string()
    .min(1, "Category is required")
    .max(30, "Category cannot exceed 30 characters"),
  stock: z.coerce.number().min(1, "Stock must be at least 1").default(1),
  productImage: z
    .any()
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`,
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

export const newAddProductSchema = addProductSchema
  .omit({ productImage: true })
  .extend({
    imgUrl: z
      .string()
      .url()
      .min(5, "Image URL must be at least 5 characters long"),
  });

// Define TypeScript type based on the add product schema
export type AddProductType = z.infer<typeof addProductSchema>;
export type newAddProductType = z.infer<typeof newAddProductSchema>;
