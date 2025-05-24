"use server";
import { COOKIE_NAME } from "@/constanst";
import { serializeDocument } from "@/lib/utils";
import { verifyAuth } from "@/lib/auth";
import Order from "@/models/Order";
import { cookies } from "next/headers";

export async function getMyOrderAction() {
  const token = (await cookies()).get(COOKIE_NAME);

  const verifiedToken =
    token &&
    (await verifyAuth(token.value).catch((err) => {
      console.log("Verification error:", err);
      return null;
    }));

  try {
    const order = await Order.find({ userId: verifiedToken?._id }).sort({
      createdAt: -1,
    });

    if (!order)
      return {
        status: "error",
        message: "Product tidak dapat ditemukan.",
      };

    return {
      status: "success",
      message: "Order fetched successfully.",
      order: serializeDocument(order),
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to retrieve the order.",
      error: (error as { message: string }).message,
    };
  }
}
