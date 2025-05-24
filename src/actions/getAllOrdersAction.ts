"use server";
import { serializeDocument } from "@/lib/utils";
import { connectToDatabase } from "@/lib/dbConnect";
import Order, { IOrder } from "@/models/Order";

export interface INewOrder extends IOrder {
  createdAt: Date;
  updatedAt: Date;
}

export async function getAllOrdersAction(page: number, limit: number) {
  try {
    await connectToDatabase();

    const skip = (page - 1) * limit;

    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    const totalItemsLength: number = await Order.find({}).countDocuments();

    return {
      status: "success",
      message: "Products fetched successfully.",
      items: serializeDocument(orders),
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
