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
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { $set: { paymentStatus: response.transaction_status } },
      { new: true } // Return the updated document
    ).lean();

    if (!updatedOrder) {
      console.log("Order not found or no fields to update.");

      // No documents were updated
      return {
        status: "error",
        message: "Order not found or no fields to update.",
      };
    }

    console.log(updatedOrder);

    revalidateTag("/");

    return {
      status: "success",
      message: "Order details successfully updated.",
      token: updatedOrder.token,
    };
  } catch (error) {
    console.log("Error:", error);

    return {
      status: "error",
      message: (error as { message: string }).message,
    };
  }
}
