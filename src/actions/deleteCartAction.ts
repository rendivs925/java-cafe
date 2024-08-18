"use server";
import { getVerifiedToken } from "@/lib/auth";
import { connectToDatabase } from "@/lib/dbConnect";
import Cart from "@/models/Cart";
import { ClientSession } from "mongoose";
import { revalidateTag } from "next/cache";

export async function deleteCartAction() {
  const session: ClientSession = await connectToDatabase();
  session.startTransaction();

  try {
    const verifiedToken = await getVerifiedToken();
    const userId = verifiedToken?._id;
    const result = await Cart.deleteOne({ userId }).session(session);

    if (result.deletedCount === 0) {
      await session.abortTransaction();
      return { status: "error", message: "Cart not found" };
    }

    await session.commitTransaction();

    revalidateTag("/");

    console.log("Cart deleted successfully.");

    return { status: "success", message: "Cart deleted successfully" };
  } catch (error) {
    console.log(error);

    await session.abortTransaction();
    return { status: "error", message: "Internal Server Error" };
  } finally {
    session.endSession();
  }
}
