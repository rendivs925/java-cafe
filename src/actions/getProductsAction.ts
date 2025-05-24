"use server";
import { connectToDatabase } from "@/lib/dbConnect";
import { serializeDocument } from "@/lib/utils";
import Product, { IProduct } from "@/models/Product";

export async function getProductsAction(page: number, limit: number) {
  try {
    await connectToDatabase();

    const skip = (page - 1) * limit;

    const products: IProduct[] = await Product.find({})
      .skip(skip)
      .limit(limit)
      .lean();
    const totalItemsLength: number = await Product.find({}).countDocuments();

    const formattedProducts = products.map((product) => {
      return {
        ...product,
        _id: product?._id?.toString(),
      };
    });

    return {
      status: "success",
      message: "Products fetched successfully.",
      items: serializeDocument(formattedProducts),
      totalItemsLength,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Error fetching products.",
      items: [],
      totalItemsLength: 0,
    };
  }
}
