"use server";

import { connectToDatabase } from "@/lib/dbConnect";
import { deleteFile } from "@/lib/storage";
import Blog from "@/models/Blog";
import { revalidatePath } from "next/cache";

export default async function deleteBlogAction(
  blogId: number | string,
  filePath: string,
) {
  try {
    await connectToDatabase();

    const response = await Blog.deleteOne({
      _id: blogId,
    });

    if (response.deletedCount === 0)
      return {
        message: "Blog post not found.",
        status: "error",
      };

    revalidatePath("/admin/blogs");

    await deleteFile(filePath);

    return {
      status: "success",
      message: "Blog post deleted successfully.",
    };
  } catch (error) {
    return { status: "error", message: "Internal server error." };
  }
}
