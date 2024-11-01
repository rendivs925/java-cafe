"use server";

import { connectToDatabase } from "@/lib/dbConnect";
import User from "@/models/User";
import { AddUserType } from "@/schemas/AddUserSchema";

export interface IUser extends Omit<AddUserType, "password"> {
  _id: string | number;
  createdAt: Date;
  updatedAt: Date;
  imgUrl: string;
}

export async function getUserByIdAction(userId: string | number) {
  try {
    await connectToDatabase();

    const user = await User.findOne({
      _id: userId,
      role: { $ne: "admin" }
    }).lean();

    if (!user) {
      return {
        status: "error",
        message: "User not found.",
        item: null,
      };
    }

    const data = {
      ...user,
      _id: user._id.toString(),
    };

    const { password, ...filteredData } = data;

    return {
      status: "success",
      message: "User fetched successfully.",
      item: filteredData,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Error fetching user.",
      item: null,
    };
  }
}
