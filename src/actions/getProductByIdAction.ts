"use server";
import { serializeDocument } from "@/lib/utils";
import { connectToDatabase } from "@/lib/dbConnect";
import Product, { IProduct } from "@/models/Product";

export async function getProductByIdAction(id: string) {
  try {
    await connectToDatabase();

    const product: IProduct | null = await Product.findById(id).lean();

    console.log(product);

    if (!product) {
      return {
        status: "error",
        message: "Product not found.",
        item: null,
      };
    }

    return {
      status: "success",
      message: "Product fetched successfully.",
      item: product,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Error fetching product.",
      item: null,
    };
  }
}
