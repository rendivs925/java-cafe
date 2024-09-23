"use server";
import { ProductType } from "@/components/ProductsList";
import { connectToDatabase } from "@/lib/dbConnect";
import Product from "@/models/Product";

export default async function getProductByIdAction(id: string) {
  try {
    await connectToDatabase();

    // Find the product by ID
    const product: ProductType | null = await Product.findById(id).lean();

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
      _id: product._id.toString(),
    };

    return {
      status: "success",
      message: "Product fetched successfully.",
      item: formattedProduct,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Error fetching product.",
      item: null,
    };
  }
}
