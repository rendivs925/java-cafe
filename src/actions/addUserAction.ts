"use server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/dbConnect";
import User from "@/models/User";
import {
  addUserSchema,
  AddUserType,
  NewAddUserType,
} from "@/schemas/AddUserSchema";

const findExistingUser = async (username: string, email: string) => {
  const user = await User.findOne({
    $or: [{ username }, { email }],
  }).lean();

  if (!user) return null;

  return {
    path: user.username === username ? "username" : "email",
    message: `An account with this ${user.username === username ? "username" : "email"} already exists. Please choose a different one.`,
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
    console.log("1 Run !!")
    await connectToDatabase();

    const email = (formData.get("email") as string).trim();
    const password = (formData.get("password") as string).trim();
    const username = (formData.get("username") as string).trim();
    const role = formData.get("role") as "user" | "admin";

    console.log("2 Run !!")

    const userData: AddUserType = { email, password, username, role };

    const validationResult = addUserSchema.safeParse(userData);
    if (!validationResult.success) {
      return {
        status: "error",
        message: "Validation failed. Please correct the errors and try again.",
        errors: validationResult.error.errors,
      };
    }

    console.log("3 Run !!")

    const existingUserError = await findExistingUser(username, email);
    if (existingUserError) {
      return existingUserError;
    }

    const newUserData: NewAddUserType = {
      username,
      email,
      password,
      role,
      imgUrl: "",
    };

    const userRole = determineUserRole(email, password, role);
    const hashedPassword = await bcrypt.hash(password, 10);

    await createNewUser(newUserData, hashedPassword, userRole);

    return {
      status: "success",
      message: "User successfully added to the database.",
    };
  } catch (error) {
    return {
      status: "error",
      message: "An internal server error occurred. Please try again later.",
    };
  }
}
