"use server";
import { connectToDatabase } from "@/lib/dbConnect";
import Order from "@/models/Order";
import { revalidateTag } from "next/cache";

export default async function editResiAction(orderId: string, resi: string) {
  try {
    await connectToDatabase();

    // Update the order's resi field and change orderStatus to "delivered" based on the provided orderId
    const result = await Order.updateOne(
      { orderId }, // Filter by orderId
      {
        $set: {
          resi,
          orderStatus: "delivered", // Update the orderStatus to "delivered"
        },
      }
    );

    if (result.matchedCount === 0) {
      return {
        status: "error",
        message: "Order not found.",
      };
    }

    revalidateTag("/admin/orders");

    return {
      status: "success",
      message: "Resi and order status updated successfully.",
    };
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: (error as { message: string }).message,
    };
  }
}
