"use server";
import Order, { IOrder } from "@/models/Order";

export async function createOrderAction(body: IOrder) {
  try {
    await Order.create(body);

    return {
      status: "success",
      message: "Pesanan berhasil dibuat.",
    };
  } catch (error) {
    return {
      status: "error",
      message: (error as { message: string }).message,
    };
  }
}
