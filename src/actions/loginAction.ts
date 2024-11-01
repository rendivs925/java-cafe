"use server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/dbConnect";
import User from "@/models/User";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { baseUserSchema, BaseUserType } from "@/schemas/UserSchema";
import { COOKIE_NAME } from "@/constanst";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "@/lib/auth";
import { SignJWT } from "jose";
import { getUserCartAction } from "./getUserCartAction";

const MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds

export async function loginAction(formData: FormData) {
  try {
    const data: BaseUserType = {
      email: (formData.get("email") as string).trim(),
      password: (formData.get("password") as string).trim(),
    };

    // Validate the data against the schema
    const parseResult = baseUserSchema.safeParse(data);
    if (!parseResult.success) {
      return {
        status: "error",
        message: "Invalid input. Please check your email and password.",
        errors: parseResult.error.errors,
      };
    }

    const { email, password } = parseResult.data;

    await connectToDatabase();

    const user = await User.findOne({ email }).lean();

    if (!user) {
      return {
        status: "error",
        message: "Invalid credentials. Please try again.",
      };
    }

    // Validate password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return {
        status: "error",
        message: "Invalid credentials. Please try again.",
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

    // Set the authentication cookie
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

    const cartResponse = await getUserCartAction();

    revalidateTag("/");

    return {
      status: "success",
      message: "Login successful. Welcome back!",
      totalItems: cartResponse.cart.products.length,
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
      message: "An unexpected error occurred. Please try again later.",
      totalItems: 0,
    };
  }
}
