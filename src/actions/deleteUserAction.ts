"use server";

import { connectToDatabase } from "@/lib/dbConnect";
import { deleteFile } from "@/lib/storage";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export async function deleteUserAction(
  itemId: number | string,
  filePath: string
) {
  try {
    await connectToDatabase();
    const response = await User.deleteOne({
      _id: itemId,
    });

    if (response.deletedCount === 0)
      return {
        message: "User not found.",
        status: "error",
      };

    revalidatePath("/admin/users");

    await deleteFile(filePath);

    return {
      status: "success",
      message: "User deleted successfully.",
    };
  } catch (error) {
    return { status: "error", message: "Internal server error." };
  }
}
