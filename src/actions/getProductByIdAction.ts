"use server";
import { connectToDatabase } from "@/lib/dbConnect";
import { serializeDocument } from "@/lib/utils";
import Product, { IProduct } from "@/models/Product";

export async function getProductByIdAction(id: string) {
  try {
    await connectToDatabase();

    // Find the product by ID
    const product: IProduct | null = await Product.findById(id).lean()

    if (!product) {
      return {
        status: "error",
        message: "Product not found.",
        item: null,
      };
    }

    // Format the product object
    const formattedProduct = {
      ...product,
      _id: product?._id?.toString(),
    };

    return {
      status: "success",
      message: "Product fetched successfully.",
      item: serializeDocument(formattedProduct),
    };
  } catch (error) {
    return {
      status: "error",
      message: "Error fetching product.",
      item: null,
    };
  }
}
