"use server";
import Order from "@/models/Order";
import { INewOrder } from "./getAllOrdersAction";

export async function getRecentOrdersAction() {
  try {
    const orders = await Order.find({
      orderStatus: "processing",
      paymentStatus: { $ne: "expire" },
    }).sort({
      createdAt: -1,
    });

    if (orders.length === 0) {
      return {
        status: "success",
        message: "No processing orders found.",
        orders: [],
      };
    }

    return {
      status: "success",
      message: "Processing orders fetched successfully.",
      orders: JSON.parse(JSON.stringify(orders)) as INewOrder[],
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to retrieve processing orders.",
      error: (error as { message: string }).message,
    };
  }
}
