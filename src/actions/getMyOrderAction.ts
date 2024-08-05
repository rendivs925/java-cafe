"use server";
import Order from "@/models/Order";

interface getMyOrderActionProps {
  orderId: string;
}

export async function getMyOrderAction({ orderId }: getMyOrderActionProps) {
  try {
    const order = await Order.find({ orderId })
      .sort({ createdAt: -1 })
      .populate({
        path: "products",
        populate: { path: "productId", model: "Product" },
      })
      .exec();

    return {
      status: "success",
      order,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Failed to retrieve the order.",
      error: (error as { message: string }).message,
    };
  }
}
