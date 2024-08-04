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

const handleUpload = async (file: File) => {
  const folder = "products/";
  const imagePath = await uploadFile(file, folder);
  const imageUrl = await getFile(imagePath);

  return imageUrl;
};

async function checkForExistingUser(username: string, email: string) {
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  }).lean();
  if (existingUser) {
    const { path, message } =
      existingUser.username === username
        ? {
            path: "username",
            message: `Akun dengan username ${username} sudah ada di database.`,
          }
        : {
            path: "email",
            message: `Akun dengan email ${email} sudah ada di database.`,
          };
    return { path, message, status: "error" };
  }
}

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

    const existingUser = await checkForExistingUser(
      payload.username,
      payload.email
    );

    if (existingUser) return existingUser;

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    // Determine the role based on credentials
    let role =
      payload.email === ADMIN_EMAIL && payload.password === ADMIN_PASSWORD
        ? "admin"
        : "user";
    role = payload.role === "admin" ? "admin" : "user";

    // Hash the password
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    // Create a new user
    const newUser = new User({
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
      role,
      imgUrl,
    });

    // Save the user to the database
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
