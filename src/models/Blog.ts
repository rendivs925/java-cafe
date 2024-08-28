import mongoose, { Schema, Model } from "mongoose";

// Define the TypeScript interface for the Blog document
export interface IBlog {
  title: string;
  author: {
    authorId: string;
    username: string;
    imgUrl: string;
  };
  prevImgUrl: string;
  content: string;
  description: string;
  tags: string[];
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string | number;
}

// Create the Mongoose schema for the Blog
const BlogSchema: Schema<IBlog> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: {
      authorId: { type: String, required: true },
      username: { type: String, required: true },
      imgUrl: { type: String, required: true },
    },
    prevImgUrl: { type: String, required: false },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Create and export the Mongoose model
const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
