"use server";
import { connectToDatabase } from "@/lib/dbConnect";
import { getFile, uploadFile } from "@/lib/storage";
import User from "@/models/User";
import {
  addUserSchema,
  AddUserType,
  NewAddUserType,
} from "@/schemas/AddUserSchema";
import { revalidatePath } from "next/cache";

const handleUpload = async (file: File) => {
  const folder = "products/";
  const imagePath = await uploadFile(file, folder);
  const imageUrl = await getFile(imagePath);

  return imageUrl;
};

export async function addUserAction(formData: FormData) {
  try {
    await connectToDatabase();

    const data: AddUserType = {
      profileImage: formData.get("profileImage") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      username: formData.get("username") as string,
      role: formData.get("role") as "user" | "admin",
    };

    // Validate the data against the schema
    const parseResult = addUserSchema.safeParse(data);
    if (!parseResult.success) {
      return {
        status: "error",
        message: parseResult.error.errors.map((err) => err.message).join(", "),
        errors: parseResult.error.errors,
      };
    }

    const imgUrl = await handleUpload(data.profileImage as File);

    // Extracting data from formData and casting to appropriate types
    const { profileImage, ...payload } = parseResult.data;

    (payload as NewAddUserType).imgUrl = imgUrl;

    // Add the product to the database
    const newUser = new User(payload);
    await newUser.save();

    revalidatePath("/admin/users/add");
    revalidatePath("/admin/users");

    return {
      status: "success",
      message: "User added successfully.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as { message: string }).message || "Internal server error.",
    };
  }
}
