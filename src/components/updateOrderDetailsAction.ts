"use server";
import { connectToDatabase } from "@/lib/dbConnect";
import Order from "@/models/Order";
import midtransClient from "midtrans-client";
import { ClientSession } from "mongoose";
import { revalidateTag } from "next/cache";

interface UpdateOrderDetailsActionProps {
  orderId: string;
}

export async function updateOrderDetailsAction({
  orderId,
}: UpdateOrderDetailsActionProps) {
  const session: ClientSession = await connectToDatabase();
  session.startTransaction();

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

    console.log("UpdatedResult:", updateResult);

    if (updateResult.modifiedCount === 0) {
      await session.abortTransaction();

      return {
        status: "error",
        message: "Order not found or no fields to update.",
      };
    }

    revalidateTag("/");

    await session.commitTransaction();

    return {
      status: "success",
      message: "Order details successfully updated.",
    };
  } catch (error) {
    console.log("Error:", error);

    await session.abortTransaction();

    return {
      status: "error",
      message: (error as { message: string }).message,
    };
  }
}
