"use server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/dbConnect";
import Product from "@/models/Product";

interface ISetRatingAction {
  productId: string,
  userId: string,
  rating: number;
}

export async function setRatingAction(data: ISetRatingAction) {
  try {
    await connectToDatabase();
    const { productId, userId, rating } = data;

    if (rating < 0 || rating > 5) {
      return {
        status: "error",
        message: "Rating must be between 0 and 5.",
      };
    }

    console.log("ProductId:", productId)

    // Find the product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return {
        status: "error",
        message: "Product not found.",
      };
    }

    // Check if the user has already rated this product
    const existingReview = product?.reviews?.find(review => review.userId.toString() === userId);
    if (existingReview) {
      // Update the existing rating
      existingReview.rating = rating;
    } else {
      // Add a new review
      product?.reviews?.push({ userId: new mongoose.Types.ObjectId(userId), rating });
    }

    // Calculate the new average rating
    const totalRatings = product?.reviews?.reduce((sum, review) => sum + review.rating, 0);
    product.rating = totalRatings / product?.reviews?.length;

    await product.save();

    return {
      status: "success",
      message: "Rating set successfully.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as { message: string }).message || "Internal server error.",
    };
  }
}
