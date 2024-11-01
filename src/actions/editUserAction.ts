"use server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/dbConnect";
import { getFile, uploadFile } from "@/lib/storage";
import User from "@/models/User";
import {
  editUserSchema,
  EditUserType,
  NewEditUserType,
} from "@/schemas/EditUserSchema";
import { revalidatePath } from "next/cache";

const uploadProfileImage = async (file: File): Promise<string> => {
  const folderPath = "products/";
  const imagePath = await uploadFile(file, folderPath);
  return getFile(imagePath);
};

const findExistingUserById = async (userId: string) => {
  const user = await User.findById(userId).lean();
  if (!user) {
    return {
      status: "error",
      message: "User not found.",
    };
  }
  return user;
};

const determineUserRole = (
  email: string,
  password: string,
  requestedRole: "user" | "admin",
): "user" | "admin" => {
  const isAdminCredentials =
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD;
  return isAdminCredentials || requestedRole === "admin" ? "admin" : "user";
};

const updateUserInDatabase = async (
  userId: string,
  updatedData: NewEditUserType,
) => {
  await User.findByIdAndUpdate(userId, updatedData);
};

export async function editUserAction(userId: string, formData: FormData) {
  try {
    await connectToDatabase();

    const userData: EditUserType = {
      profileImage: formData.get("profileImage") as string, // Could be empty if not updated
      email: (formData.get("email") as string).trim(),
      password: (formData.get("password") as string).trim(),
      username: (formData.get("username") as string).trim(),
      role: (formData.get("role") as "user" | "admin"),
    };

    const validationResult = editUserSchema.safeParse(userData);
    if (!validationResult.success) {
      return {
        status: "error",
        message: `Validation failed. Please correct them and try again.`,
        errors: validationResult.error.errors,
      };
    }

    const existingUser = await findExistingUserById(userId);
    if (!existingUser) {
      return {
        status: "error",
        message: "User not found. Please try again.",
      };
    }

    let profileImageUrl = (existingUser as { imgUrl: string }).imgUrl;
    if (validationResult.data.profileImage) {
      profileImageUrl = await uploadProfileImage(
        validationResult.data.profileImage as File,
      );
    }

    const newUserData: NewEditUserType = {
      ...validationResult.data,
      imgUrl: profileImageUrl,
    };

    if (newUserData.password) {
      newUserData.password = await bcrypt.hash(newUserData.password, 10);
    } else {
      newUserData.password = (existingUser as { password: string }).password;
    }

    const role = determineUserRole(
      newUserData.email,
      validationResult.data.password,
      newUserData.role,
    );

    await updateUserInDatabase(userId, {
      ...newUserData,
      role,
    });

    revalidatePath("/admin/users/edit");
    revalidatePath("/admin/users");

    return {
      status: "success",
      message: "User successfully updated in the database.",
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      status: "error",
      message: "An internal server error occurred. Please try again later.",
    };
  }
}
