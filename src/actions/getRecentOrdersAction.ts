"use server";
import Order from "@/models/Order";
import { INewOrder } from "./getAllOrdersAction";

export async function getRecentOrdersAction() {
  // Calculate the date 7 days ago
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  try {
    // Fetch orders from the last 7 days
    const orders = await Order.find({
      createdAt: { $gte: sevenDaysAgo },
    }).sort({ createdAt: -1 });

    if (orders.length === 0) {
      return {
        status: "success",
        message: "No recent orders found.",
        orders: [],
      };
    }

    return {
      status: "success",
      message: "Recent orders fetched successfully.",
      orders: JSON.parse(JSON.stringify(orders)) as INewOrder[],
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to retrieve recent orders.",
      error: (error as { message: string }).message,
    };
  }
}
