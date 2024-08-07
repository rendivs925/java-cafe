"use server";

import { connectToDatabase } from "@/lib/dbConnect";
import Cart from "@/models/Cart";
import { revalidateTag } from "next/cache";

export async function deleteCartProductAction({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) {
  if (!userId || !productId) {
    return { status: "error", message: "Missing userId or productId" };
  }

  try {
    await connectToDatabase();

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return { status: "error", message: "Cart not found" };
    }

    // Remove the product from the cart
    const initialProductCount = cart.products.length;

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    if (cart.products.length === initialProductCount) {
      // No product was removed
      return { status: "error", message: "Product not found in cart" };
    }

    await cart.save();

    revalidateTag("/cart");

    return { status: "success", message: "Product removed successfully" };
  } catch (error) {
    console.error("Failed to remove product:", error);
    return { status: "error", message: "Internal Server Error" };
  }
}
