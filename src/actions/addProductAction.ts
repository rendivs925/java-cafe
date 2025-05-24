"use server";
import { connectToDatabase } from "@/lib/dbConnect";
import { handleUpload } from "@/lib/storage";
import Product from "@/models/Product";
import {
  AddProductType,
  addProductSchema,
  newAddProductType,
} from "@/schemas/AddProductSchema";
import { revalidateTag } from "next/cache";

export async function addProductAction(formData: FormData) {
  try {
    await connectToDatabase();

    const data: AddProductType = {
      title: formData.get("title") as string,
      price: Number(formData.get("price")),
      capital: Number(formData.get("capital")),
      profit: Number(formData.get("price")) - Number(formData.get("capital")),
      weight: Number(formData.get("weight")),
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      stock: Number(formData.get("stock")),
      productImage: formData.get("productImage") as string,
    };

    const parseResult = addProductSchema.safeParse(data);
    if (!parseResult.success) {
      return {
        status: "error",
        message: "Failed to add product.",
        errors: parseResult.error.errors,
      };
    }

    const existingProduct = await Product.findOne({ title: data.title });
    if (existingProduct) {
      return {
        status: "error",
        message: "Product with this title already exists.",
      };
    }

    const imgUrl = await handleUpload(data.productImage as File, "products");

    const { productImage, ...payload } = parseResult.data;

    (payload as newAddProductType).imgUrl = imgUrl;

    const newProduct = new Product(payload);
    await newProduct.save();

    revalidateTag("/admin/products");

    return {
      status: "success",
      message: "Product added successfully.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as { message: string }).message || "Internal server error.",
    };
  }
}
