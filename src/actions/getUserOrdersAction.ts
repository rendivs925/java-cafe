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
    const userId = verifiedToken?._id;
    await connectToDatabase();

    const skip = (page - 1) * limit;

    const orders: INewOrder[] = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    const totalItemsLength: number = await Order.find({
      userId,
    }).countDocuments();

    return {
      status: "success",
      message: "Products fetched successfully.",
      items: orders,
      totalItemsLength,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Error fetching products.",
      items: [],
      totalItemsLength: 0,
    };
  }
}
