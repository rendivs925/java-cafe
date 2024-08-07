"use server";
import { connectToDatabase } from "@/lib/dbConnect";
import Cart from "@/models/Cart";

export async function decrementQtyAction({
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

    const itemIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return { status: "error", message: "Product not found in cart" };
    }

    const selectedProduct = cart.products[itemIndex];

    if ((selectedProduct as { qty: number }).qty > 0) {
      (selectedProduct as { qty: number }).qty -= 1;
    }

    await cart.save();

    return { status: "success", message: "Cart updated successfully" };
  } catch (error) {
    return { status: "error", message: "Internal Server Error" };
  }
}
