import mongoose, { Model, Schema } from "mongoose";

// Define the TypeScript interface for the review document
export interface IReview {
  userId: mongoose.Types.ObjectId; // Reference to the user
  rating: number; // Rating from 0 to 5
}

export interface IProduct {
  _id: string;
  createdAt?: Date;
  category: string;
  description: string;
  imgUrl: string;
  price: number;
  capital: number;
  profit: number;
  stock: number;
  title: string;
  weight: number;
  rating?: number; // Average rating of all reviews
  reviews: IReview[]; // Array of reviews
}

// Create the Mongoose schema for reviews
const ReviewSchema: Schema<IReview> = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  rating: { type: Number, required: true, min: 0, max: 5 }, // Ensure rating is between 0 and 5
});

// Create the Mongoose schema for products with embedded reviews
const ProductSchema: Schema<IProduct> = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: false },
    category: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String, required: true },
    price: { type: Number, required: true },
    capital: { type: Number, required: true },
    profit: { type: Number, required: true },
    stock: { type: Number, required: true },
    title: { type: String, required: true, unique: true },
    createdAt: { type: Date, required: false },
    weight: { type: Number, required: true },
    rating: { type: Number, required: false, default: 0 },
    reviews: { type: [ReviewSchema], default: [] },
  },
  { timestamps: true },
);

// Create and export the Mongoose model
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
