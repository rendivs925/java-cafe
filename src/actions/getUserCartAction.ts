"use server";
import { COOKIE_NAME } from "@/constanst";
import { UserJwtPayload, verifyAuth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/dbConnect";
import Cart from "@/models/Cart";
import { cookies } from "next/headers";

export async function getUserCartAction() {
  const token = cookies().get(COOKIE_NAME);
  // Verify the JWT token
  const verifiedToken =
    token &&
    (await verifyAuth(token.value).catch((err) => {
      console.log("Verification error:", err);
      return null; // Explicitly return null in case of error
    }));

  const userId = (verifiedToken as UserJwtPayload)?._id;
  (verifiedToken as UserJwtPayload)?._id;

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
