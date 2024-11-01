"use server";

import { connectToDatabase } from "@/lib/dbConnect";
import { deleteFile } from "@/lib/storage";
import { getVerifiedToken } from "@/lib/auth";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(
  itemId: number | string,
  filePath: string
) {
  try {

    const verifiedToken = await getVerifiedToken();

    if (!verifiedToken) {
      return {
        status: "error",
        message: "User not authenticated",
      };
    }

    const role = verifiedToken.role;

    if (role !== "admin") {
      return {
        status: "error",
        message: "Forbidden: You do not have permission to perform this action.",
      };
    }

    await connectToDatabase();

    const response = await User.deleteOne({
      _id: itemId,
    });

    if (response.deletedCount === 0) {
      return {
        message: "User not found.",
        status: "error",
      };
    }

    revalidatePath("/admin/users");
    await deleteFile(filePath);

    return {
      status: "success",
      message: "User deleted successfully.",
    };
  } catch (error) {
    return {
      status: "error",
      message: (error as Error).message || "Internal server error.",
    };
  }
}
