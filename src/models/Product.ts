import mongoose, { Document, Model, Schema } from "mongoose";

// Define the TypeScript interface for the document
interface IProduct extends Document {
  category: string;
  description: string;
  imgUrl: string;
  price: number;
  stock: number;
  title: string;
  capital: number;
  profit: number;
  weight: number;
  rating: number;
  reviews: {
    user: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
  }[];
}

// Create the Mongoose schema
const ProductSchema: Schema<IProduct> = new Schema(
  {
    category: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String, required: true },
    price: { type: Number, required: true },
    capital: { type: Number, required: true },
    profit: { type: Number, required: true },
    stock: { type: Number, required: true },
    title: { type: String, required: true, unique: true },
    weight: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: false },
      },
    ],
  },
  { timestamps: true }
);

// Create and export the Mongoose model
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
