"use server";
import midtransClient from "midtrans-client";

interface getOrderStatusActionProps {
  orderId: string;
}

export async function getOrderStatusAction({
  orderId,
}: getOrderStatusActionProps) {
  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    });

    return snap.transaction
      .status(orderId)
      .then((response: unknown) => {
        return {
          status: "success",
          response,
        };
      })
      .catch((error: unknown) => {
        const errorMessage = (error as { message: string }).message;
        console.log("Error:", errorMessage);

        return {
          status: "error",
          message: errorMessage,
        };
      });
  } catch (error) {}
}
