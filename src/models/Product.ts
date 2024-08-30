import mongoose, { Model, Schema } from "mongoose";

// Define the TypeScript interface for the document
export interface IReview {
  userId: mongoose.Types.ObjectId;
  // rating: number;
  comment: string;
}

export interface IProduct {
  category: string;
  description: string;
  imgUrl: string;
  price: number;
  capital: number;
  profit: number;
  stock: number;
  title: string;
  weight: number;
  // rating: number;
  // reviews: IReview[];
}

// Create the Mongoose schema for reviews
const ReviewSchema: Schema<IReview> = new Schema({
  userId: { type: Schema.Types.ObjectId, required: false },
  rating: { type: Number, required: false },
  comment: { type: String, required: false },
});

// Create the Mongoose schema for products
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
    // rating: { type: Number, required: false },
    // reviews: [ReviewSchema],
  },
  { timestamps: true }
);

// Create and export the Mongoose model
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
