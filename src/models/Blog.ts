import mongoose, { Schema, Model } from "mongoose";

// Define the TypeScript interface for the Blog document
export interface IBlog {
  title: string;
  author: string;
  content: string;
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
    author: { type: String, required: true },
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
