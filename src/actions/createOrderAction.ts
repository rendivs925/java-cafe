"use server";
import Order, { IOrder } from "@/models/Order";

export async function createOrderAction(data: IOrder) {
  try {
    await Order.create(JSON.parse(JSON.stringify(data)));

    return {
      status: "success",
      message: "Pesanan berhasil dibuat.",
    };
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: (error as { message: string }).message,
    };
  }
}
