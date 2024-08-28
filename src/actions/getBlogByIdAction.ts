"use server";
import { connectToDatabase } from "@/lib/dbConnect";
import Blog from "@/models/Blog"; // Import Blog model

export async function getBlogByIdAction(id: string) {
  try {
    await connectToDatabase();

    // Fetch the blog entry by ID
    const blog = await Blog.findById(id).lean(); // Use `.lean()` to get a plain JavaScript object

    if (!blog) {
      return {
        status: "error",
        message: "Blog not found.",
      };
    }

    console.log("Blog successfully retrieved.");

    return {
      status: "success",
      data: blog,
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      message: (error as { message: string }).message,
    };
  }
}
