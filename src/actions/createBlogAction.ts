"use server";
import { connectToDatabase } from "@/lib/dbConnect";
import Blog, { IBlog } from "@/models/Blog";

export async function createBlogAction(data: IBlog) {
  try {
    await connectToDatabase();
    // Create a new blog entry
    await Blog.create(JSON.parse(JSON.stringify(data)));

    console.log("Blog successfully created.");
    

    return {
      status: "success",
      message: "Blog successfully created.",
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      message: (error as { message: string }).message,
    };
  }
}
