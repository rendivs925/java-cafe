"use server";
import midtransClient from "midtrans-client";

interface GetOrderStatusActionProps {
  orderId: string;
}

export async function getOrderStatusAction({
  orderId,
}: GetOrderStatusActionProps) {
  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    });

    const orderStatus = await snap.transaction.status(orderId);

    console.log(orderStatus);

    return {
      status: "success",
      orderStatus,
    };
  } catch (error) {
    const errorMessage = (error as { message: string }).message;
    console.log("Error:", errorMessage);

    return {
      status: "error",
      message: errorMessage,
    };
  }
}
