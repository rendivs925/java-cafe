"use server";
import { IBlogWithPreviewImage } from "@/app/admin/blogs/add/page";
import { connectToDatabase } from "@/lib/dbConnect";
import { handleUpload } from "@/lib/storage";
import Blog, { IBlog } from "@/models/Blog";
import { BlogSchema } from "@/schemas/BlogFormSchema";

export async function updateBlogAction(formData: FormData) {
  try {
    await connectToDatabase();

    const blogId = formData.get("_id");
    const authorString = formData.get("author") as string | null;
    const content = formData.get("content") as string | null;
    const description = formData.get("description") as string;
    const isPublishedString = formData.get("isPublished") as string | null;
    const title = formData.get("title") as string | null;
    const tagsString = formData.get("tags") as string | null;
    const previewImage = formData.get("previewImage") as File;

    if (!authorString || !content || !title || !tagsString) {
      throw new Error("Missing required fields.");
    }

    const author = JSON.parse(authorString);
    const isPublished = isPublishedString === "true";
    const tags = JSON.parse(tagsString);

    // Construct the data object
    const data: IBlogWithPreviewImage = {
      author: {
        authorId: author.authorId,
        imgUrl: author.imgUrl,
        username: author.username,
      },
      content,
      description,
      isPublished,
      previewImage,
      tags,
      title,
    };

    console.log(blogId);

    // Find the existing blog by ID
    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog) {
      return {
        status: "error",
        message: "Blog not found.",
      };
    }

    // Handle image upload if a new image is provided
    let prevImgUrl = existingBlog.prevImgUrl;
    if (data.previewImage) {
      prevImgUrl = await handleUpload(data.previewImage, "blogs");
    }

    // Remove previewImage from the payload for validation
    const { previewImage: _, ...payload } = data;

    // Validate the payload against the schema
    const parseResult = BlogSchema.safeParse(payload);

    if (!parseResult.success) {
      return {
        status: "error",
        message: parseResult.error.errors.map((err) => err.message).join(", "),
        errors: parseResult.error.errors,
      };
    }

    // Add the preview image URL to the payload
    (payload as IBlog).prevImgUrl = prevImgUrl;

    console.log("Validated Payload:", payload);

    // Update the existing blog entry
    await Blog.findByIdAndUpdate(blogId, payload, { new: true });

    console.log("Blog successfully updated.");

    return {
      status: "success",
      message: "Blog successfully updated.",
    };
  } catch (error) {
    console.error("Error updating blog:", error);

    return {
      status: "error",
      message: (error as Error).message,
    };
  }
}
