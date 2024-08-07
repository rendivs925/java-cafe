import { connectToDatabase } from "@/lib/dbConnect";
import Cart from "@/models/Cart";

export async function getUserCartAction(userId: string) {
  if (!userId) {
    return {
      status: "error",
      message: "User ID is required",
      cart: { userId: "", products: [] },
    };
  }

  try {
    await connectToDatabase();

    const cart = await Cart.findOne({ userId }).lean();

    return {
      status: "success",
      cart: JSON.parse(JSON.stringify(cart)) || { userId: "", products: [] },
    };
  } catch (error) {
    console.error("Error fetching cart product list:", error);
    return {
      message: "Error fetching cart list",
      cart: { userId: "", products: [] },
    };
  }
}
