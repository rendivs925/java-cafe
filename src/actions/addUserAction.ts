"use server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/dbConnect";
import { getFile, uploadFile } from "@/lib/storage";
import User from "@/models/User";
import {
  addUserSchema,
  AddUserType,
  NewAddUserType,
} from "@/schemas/AddUserSchema";
import { revalidatePath } from "next/cache";

const uploadProfileImage = async (file: File): Promise<string> => {
  const folderPath = "products/";
  const imagePath = await uploadFile(file, folderPath);
  return getFile(imagePath);
};

const findExistingUser = async (username: string, email: string) => {
  const user = await User.findOne({
    $or: [{ username }, { email }],
  }).lean();

  if (!user) return null;

  return {
    path: user.username === username ? "username" : "email",
    message: `An account with this ${user.username === username ? "username" : "email"} already exists in the database. Please choose a different one.`,
    status: "error",
  };
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

const createNewUser = async (
  userData: NewAddUserType,
  hashedPassword: string,
  role: "user" | "admin",
) => {
  const newUser = new User({
    ...userData,
    password: hashedPassword,
    role,
  });
  await newUser.save();
};

export async function addUserAction(formData: FormData) {
  try {
    await connectToDatabase();

    const userData: AddUserType = {
      profileImage: formData.get("profileImage") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      username: formData.get("username") as string,
      role: formData.get("role") as "user" | "admin",
    };

    const validationResult = addUserSchema.safeParse(userData);
    if (!validationResult.success) {
      return {
        status: "error",
        message: `Validation failed. Please correct them and try again.`,
        errors: validationResult.error.errors,
      };
    }

    const existingUserError = await findExistingUser(
      validationResult.data.username,
      validationResult.data.email,
    );
    if (existingUserError) return existingUserError;

    const profileImageUrl = await uploadProfileImage(
      validationResult.data.profileImage as File,
    );
    const newUserData: NewAddUserType = {
      ...validationResult.data,
      imgUrl: profileImageUrl,
    };

    const role = determineUserRole(
      newUserData.email,
      newUserData.password,
      newUserData.role,
    );
    const hashedPassword = await bcrypt.hash(newUserData.password, 10);

    await createNewUser(newUserData, hashedPassword, role);

    revalidatePath("/admin/users/add");
    revalidatePath("/admin/users");

    return {
      status: "success",
      message:
        "User successfully added to the database. You can now manage this user in the admin panel.",
    };
  } catch (error) {
    console.error("Error adding user:", error);
    return {
      status: "error",
      message:
        (error as { message: string }).message ||
        "An internal server error occurred. Please try again later.",
    };
  }
}
