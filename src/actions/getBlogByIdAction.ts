"use server";
import { connectToDatabase } from "@/lib/dbConnect";
import { serializeDocument } from "@/lib/utils";
import Blog from "@/models/Blog";

export async function getBlogByIdAction(id: string) {
  try {
    await connectToDatabase();

    const blog = await Blog.findById(id).lean();

    if (!blog) {
      return {
        status: "error",
        message: "Blog not found.",
      };
    }

    console.log("Blog successfully retrieved.");

    return {
      status: "success",
      data: serializeDocument(blog),
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      message: (error as { message: string }).message,
    };
  }
}
