import { z } from "zod";
import { baseUserSchema } from "./UserSchema";
// import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "@/constanst";

// Sign-up schema extending the base schema
export const addUserSchema = baseUserSchema.extend({
  username: z
    .string()
    .min(1, "Username is required")
    .max(30, "Username cannot exceed 30 characters"),
  // profileImage: z
  //   .any()
  //   .refine((files) => {
  //     return files?.size <= MAX_FILE_SIZE;
  //   }, `Max image size is 5MB.`)
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type),
  //     "Only .jpg, .jpeg, .png and .webp formats are supported."
  //   ),
  role: z.enum(["user", "admin"]), // Adding role field
});

export const newAddUserSchema = addUserSchema.extend({
  imgUrl: z
    .string()
    .url()
    .min(5, "imgUrl must be at least 5 characters long")
    .optional(),
});

export type AddUserType = z.infer<typeof addUserSchema>;
export type NewAddUserType = z.infer<typeof newAddUserSchema>;
