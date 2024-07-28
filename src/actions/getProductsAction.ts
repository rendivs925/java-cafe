import { ProductType } from "@/components/ProductsList";
import { connectToDatabase } from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function getProductsAction() {
  "use server";
  try {
    await connectToDatabase();

    const products: ProductType[] = await Product.find({}).lean();

    return products;
  } catch (error) {
    return [];
  }
}
