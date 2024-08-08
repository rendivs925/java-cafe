"use server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/dbConnect";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { baseUserSchema, BaseUserType } from "@/schemas/UserSchema";
import { COOKIE_NAME } from "@/constanst";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "@/lib/auth";
import { SignJWT } from "jose";

const MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds

export async function loginAction(formData: FormData) {
  try {
    const data: BaseUserType = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    // Validate the data against the schema
    const parseResult = baseUserSchema.safeParse(data);
    if (!parseResult.success) {
      return {
        message: "Invalid input",
        errors: parseResult.error.errors,
        status: "error",
      };
    }

    const { email, password } = parseResult.data;

    await connectToDatabase();

    const user = await User.findOne({ email }).lean();

    if (!user) {
      return {
        message: "Akun tidak bisa ditemukan.",
        path: "email",
        status: "error",
      };
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return {
        status: "error",
        message: "Password anda salah.",
        path: "password",
      };
    }

    // Create JWT token
    const token = await new SignJWT({
      _id: user._id,
      role: user.role,
      email: user.email,
      username: user.username,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime(`${MAX_AGE}s`)
      .sign(new TextEncoder().encode(getJwtSecretKey()));

    cookies().set({
      name: COOKIE_NAME,
      value: token,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      path: "/",
      maxAge: MAX_AGE,
      sameSite: "strict",
      expires: new Date(Date.now() + MAX_AGE),
    });

    console.log("TOKEN:", cookies().get(COOKIE_NAME));

    revalidatePath("/auth/login");

    return {
      status: "success",
      message: "Authenticated!",
      user: {
        _id: user._id.toString(),
        username: user.username,
        role: user.role,
        email: user.email,
        imgUrl: user.imgUrl,
      },
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as { message: string }).message || "Internal server error.",
    };
  }
}
