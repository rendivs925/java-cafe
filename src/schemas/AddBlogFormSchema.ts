import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/constanst";
import { z } from "zod";

export const AddBlogFormSchema = z.object({
  blogTitle: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(1, {
    message: "Description cannot be empty.",
  }),
  content: z.string().min(1, {
    message: "Content cannot be empty.",
  }),
  tags: z
    .array(z.string())
    .nonempty({ message: "At least one tag is required." }),
  previewImage: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

// Define the Zod schema based on the IBlog interface
export const BlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  author: z.object({
    authorId: z.string(),
    username: z.string(),
    imgUrl: z.string().url("Invalid URL format for image"),
  }),
  prevImgUrl: z.string().url().optional(),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).default([]),
  isPublished: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _id: z.string().or(z.number()).optional(),
});

// Define TypeScript type based on the Zod schema
export type BlogType = z.infer<typeof BlogSchema>;

// Define TypeScript type based on the base schema
export type AddBlogFormType = z.infer<typeof AddBlogFormSchema>;
