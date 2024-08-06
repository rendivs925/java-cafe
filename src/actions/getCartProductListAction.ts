import { connectToDatabase } from "@/lib/dbConnect";
import Cart from "@/models/Cart";

export async function getCartProductListAction(userId: string) {
  try {
    await connectToDatabase();

    console.log("UserId:", userId);
    const cartProductList = await Cart.findOne({ userId }).populate("products");

    console.log("cartProductList:", cartProductList);

    return {
      status: "success",
      cartProductList: cartProductList || [],
    };
  } catch (error) {
    return {
      status: "error",
      message: "Error fetching cart product list",
      cartProductList: [],
    };
  }
}
