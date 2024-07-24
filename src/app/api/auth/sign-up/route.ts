import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { signUpSchema } from "@/schemas/UserSchema";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/dbConnect";

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
    return NextResponse.json({ path, message }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const data = await req.json();
    const parseResult = signUpSchema.safeParse(data);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: parseResult.error.errors,
        },
        {
          status: 400,
        }
      );
    }

    const { email, password, username } = parseResult.data;

    await connectToDatabase();

    const existingUser = await checkForExistingUser(username, email);

    if (existingUser) return existingUser;

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    console.log(ADMIN_EMAIL);
    console.log(ADMIN_PASSWORD);

    // Determine the role based on credentials
    const role =
      email === ADMIN_EMAIL && password === ADMIN_PASSWORD ? "admin" : "user";

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username: username,
      email: email,
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
