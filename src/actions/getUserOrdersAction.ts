"use server";
import { getVerifiedToken } from "@/lib/auth";
import { connectToDatabase } from "@/lib/dbConnect";
import Order, { IOrder } from "@/models/Order";

export interface INewOrder extends IOrder {
  createdAt: Date;
  updatedAt: Date;
}

export async function getUserOrdersAction(page: number, limit: number) {
  try {
    const verifiedToken = await getVerifiedToken();
    if (!verifiedToken) {
      throw new Error("User not authenticated");
    }

    const userId = verifiedToken._id;
    await connectToDatabase();

    const skip = (page - 1) * limit;

    // Use Promise.all to get both the orders and the total count in parallel
    const [orders, totalItemsLength] = await Promise.all([
      Order.find({ "user.userId": userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean<INewOrder[]>(),
      Order.countDocuments({ "user.userId": userId }),
    ]);

    return {
      status: "success",
      message: "Orders fetched successfully.",
      items: orders,
      totalItemsLength,
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      status: "error",
      message: "Error fetching orders.",
      items: [],
      totalItemsLength: 0,
    };
  }
}
