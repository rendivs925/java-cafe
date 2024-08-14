"use server";
import { connectToDatabase } from "@/lib/dbConnect";
import Cart, { ICart } from "@/models/Cart";
import { ClientSession } from "mongoose";
import { revalidateTag } from "next/cache";

export async function setCartAction(data: ICart) {
  const session: ClientSession = await connectToDatabase();
  session.startTransaction();

  try {
    const cart = await Cart.findOne({ userId: data.userId }).session(session);

    if (!cart) {
      await session.abortTransaction();
      return { status: "error", message: "Cart not found" };
    }

    const isError = cart.products.some(
      (product) =>
        (product as { qty: number }).qty < 1 ||
        (product as { qty: number }).qty > product.stock
    );

    if (isError) {
      await session.abortTransaction();
      return {
        status: "error",
        message: "Invalid product quantities in the cart",
      };
    }

    cart.products = data.products;

    await cart.save({ session });

    await session.commitTransaction();

    revalidateTag("/");

    return { status: "success", message: "Cart updated successfully" };
  } catch (error) {
    console.log(error);

    await session.abortTransaction();
    return { status: "error", message: "Internal Server Error" };
  } finally {
    session.endSession();
  }
}
