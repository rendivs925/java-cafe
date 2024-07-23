"use server";
import { serialize } from "cookie";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "@/lib/auth";
import { COOKIE_NAME } from "@/constanst";
import { baseUserSchema } from "@/schemas/UserSchema";
import { z } from "zod";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";

const MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds

export default async function loginAction(formData: FormData) {
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const parseResult = baseUserSchema.safeParse(loginData);

    if (parseResult.success) {
      // save the data, send an email, etc.
      revalidatePath("/auth/login");
    } else {
      return {
        errors: parseResult.error.issues,
      };
    }
  } catch (error) {
    return {
      errors: error,
    };
  }
}
