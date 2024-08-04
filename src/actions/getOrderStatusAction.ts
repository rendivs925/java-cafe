"use server";
import midtransClient from "midtrans-client";

interface getOrderStatusActionProps {}

export async function getOrderStatusAction({}: getOrderStatusActionProps) {
  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
    });

    snap.transaction.status(origin).then();
  } catch (error) {}
}
