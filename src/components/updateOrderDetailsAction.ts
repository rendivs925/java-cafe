"use server";
import Order from "@/models/Order";
import midtransClient from "midtrans-client";
import { revalidateTag } from "next/cache";

interface UpdateOrderDetailsActionProps {
  orderId: string;
}

export async function updateOrderDetailsAction({
  orderId,
}: UpdateOrderDetailsActionProps) {
  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    });

    // Get the transaction status from Midtrans
    const response = await snap.transaction.status(orderId.toString());

    console.log(response);

    // Update the order with the provided fields
    const updateResult = await Order.updateOne(
      { orderId },
      { $set: { paymentStatus: response.transaction_status } }
    );

    if (updateResult.modifiedCount === 0) {
      return {
        status: "error",
        message: "Order not found or no fields to update.",
      };
    }

    console.log(updateResult);

    revalidateTag("/");

    return {
      status: "success",
      message: "Order details successfully updated.",
    };
  } catch (error) {
    console.log("Error:", error);

    return {
      status: "error",
      message: (error as { message: string }).message,
    };
  }
}
