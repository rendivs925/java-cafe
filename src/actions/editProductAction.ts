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

export async function editProductAction(formData: FormData, productId: string) {
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
      productImage: formData.get("productImage") as File | null,
    };

    // Validate the data against the schema
    const parseResult = addProductSchema.safeParse(data);
    if (!parseResult.success) {
      return {
        status: "error",
        message: "Failed to edit product.",
        errors: parseResult.error.errors,
      };
    }

    // Find the product by ID
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return {
        status: "error",
        message: "Product not found.",
      };
    }

    // Handle image upload if a new image is provided
    let imgUrl = existingProduct.imgUrl;
    if (data.productImage) {
      imgUrl = await handleUpload(data.productImage as File, "products");
    }

    // Update the product with the new data
    const { productImage, ...payload } = parseResult.data;
    (payload as newAddProductType).imgUrl = imgUrl;

    await Product.findByIdAndUpdate(productId, payload, { new: true });

    revalidateTag("/admin/products");

    return {
      status: "success",
      message: "Product updated successfully.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as { message: string }).message || "Internal server error.",
    };
  }
}
