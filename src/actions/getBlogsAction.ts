"use server";
import { connectToDatabase } from "@/lib/dbConnect";
import Blog, { IBlog } from "@/models/Blog";
import { serializeDocument } from "@/lib/utils";

export async function getBlogsAction(page: number, limit: number) {
  try {
    await connectToDatabase();

    const skip = (page - 1) * limit;

    const blogs: IBlog[] = await Blog.find({}).skip(skip).limit(limit).lean();
    const totalItemsLength: number =
      (await Blog.find({}).countDocuments()) || 0;

    console.log("Blogs successfully retrieved.");

    return {
      status: "success",
      message: "Blogs successfully retrieved.",
      items: serializeDocument(blogs),
      totalItemsLength,
    };
  } catch (error) {
    console.error(error);

    return {
      status: "error",
      message: (error as { message: string }).message,
      items: [],
      totalItemsLength: 0,
    };
  }
}
