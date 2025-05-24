import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/constanst";
import { z } from "zod";

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const BlogFormSchema = z.object({
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
    .custom<File>()
    .optional()
    .refine((file) => file?.size <= MAX_FILE_SIZE, {
      message: `The image is too large. Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}.`,
    })
    .refine(
      (file) => !file || ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
});

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

export type BlogType = z.infer<typeof BlogSchema>;

export type BlogFormType = z.infer<typeof BlogFormSchema>;
