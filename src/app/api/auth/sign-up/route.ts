import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { signUpSchema } from "@/schemas/UserSchema";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/dbConnect";

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    const validatedData = signUpSchema.parse(body);

    // Connect to the database
    await connectToDatabase();

    // Determine the role based on credentials
    const role =
      validatedData.email === "rendi@gmail.com" &&
      validatedData.password === "12345678"
        ? "admin"
        : "user";

    // Hash the password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create a new user
    const newUser = new User({
      username: validatedData.username,
      email: validatedData.email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();

    // Return a success response
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      // If validation fails, send a 400 response with the validation errors
      return NextResponse.json(
        { message: "Validation failed", errors: error.errors },
        { status: 400 }
      );
    } else {
      console.error("Error creating user:", error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  }
}
