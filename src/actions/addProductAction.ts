"use server";
import { ProductType } from "@/components/ProductsList";
import { connectToDatabase } from "@/lib/dbConnect";
import { getFile, uploadFile } from "@/lib/storage";
import Product from "@/models/Product";
import {
  AddProductType,
  newAddProductSchema,
  addProductSchema,
  newAddProductType,
} from "@/schemas/AddProductSchema";
import { revalidatePath } from "next/cache";

const handleUpload = async (file: File) => {
  const folder = "products/";
  const imagePath = await uploadFile(file, folder);
  const imageUrl = await getFile(imagePath);

  return imageUrl;
};

export async function addProductAction(formData: FormData) {
  try {
    console.log("Masukkkk");

    await connectToDatabase();

    const data: AddProductType = {
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")) as number,
      stock: Number(formData.get("stock")) as number,
      title: formData.get("title") as string,
      productImage: formData.get("productImage") as string,
    };

    console.log("Product:", data);
    // Validate the data against the schema
    const parseResult = addProductSchema.safeParse(data);
    if (!parseResult.success) {
      console.log("Errors:", parseResult.error.errors);

      return {
        status: "error",
        message: parseResult.error.errors.map((err) => err.message).join(", "),
        errors: parseResult.error.errors,
      };
    }

    const imgUrl = await handleUpload(data.productImage as File);

    // Extracting data from formData and casting to appropriate types
    const { productImage, ...payload } = parseResult.data;

    (payload as newAddProductType).imgUrl = imgUrl;

    // Add the product to the database
    const newProduct = new Product(payload);
    await newProduct.save();

    revalidatePath("/admin/products/add");

    console.log("Product added successfully.");

    return {
      status: "success",
      message: "Product added successfully.",
    };
  } catch (error) {
    console.error("Error adding product:", error);
    return {
      status: "error",
      message:
        (error as { message: string }).message || "Internal server error.",
    };
  }
}
