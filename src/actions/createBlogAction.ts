"use server";
import { IBlogWithPreviewImage } from "@/app/admin/blogs/add/page";
import { connectToDatabase } from "@/lib/dbConnect";
import { handleUpload } from "@/lib/storage";
import Blog, { IBlog } from "@/models/Blog";
import { BlogSchema } from "@/schemas/AddBlogFormSchema";

export async function createBlogAction(formData: FormData) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Extract and validate FormData
    const authorString = formData.get("author") as string | null;
    const content = formData.get("content") as string | null;
    const description = formData.get("description") as string;
    const isPublishedString = formData.get("isPublished") as string | null;
    const title = formData.get("title") as string | null;
    const tagsString = formData.get("tags") as string | null;
    const previewImage = formData.get("previewImage") as File | null;

    if (!authorString || !content || !title || !tagsString || !previewImage) {
      throw new Error("Missing required fields.");
    }

    const author = JSON.parse(authorString);
    const isPublished = isPublishedString === "true"; // Parse boolean from string
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

    console.log("Initial Data:", data);

    // Upload the image and get the URL
    const prevImgUrl = await handleUpload(data.previewImage, "blogs");

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

    // Create a new blog entry
    await Blog.create(payload);

    console.log("Blog successfully created.");

    return {
      status: "success",
      message: "Blog successfully created.",
    };
  } catch (error) {
    console.error("Error creating blog:", error);

    return {
      status: "error",
      message: (error as Error).message,
    };
  }
}
