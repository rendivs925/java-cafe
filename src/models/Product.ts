import mongoose, { Document, Model, Schema } from "mongoose";

// Define the TypeScript interface for the document
interface IProduct extends Document {
  category: string;
  description: string;
  imgUrl: string;
  price: number;
  stock: number;
  title: string;
}

// Create the Mongoose schema
const ProductSchema: Schema = new Schema(
  {
    category: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    title: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Create and export the Mongoose model
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
