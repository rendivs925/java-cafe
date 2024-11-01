import midtransClient from "midtrans-client";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/dbConnect";
import mongoose from "mongoose";

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
  clientKey: process.env.CLIENT_KEY,
});

export async function checkAndUpdateExpiredOrders() {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Connect to the database
    await connectToDatabase();

    // Find orders that are still pending
    const pendingOrders = await Order.find({ paymentStatus: "pending" }).session(session);

    // Prepare bulk operations
    const orderUpdates = [];
    const productUpdates = [];

    for (const order of pendingOrders) {
      // Get the transaction status from Midtrans for each order
      const response = await snap.transaction.status(order.orderId);

      if (response.transaction_status === "expire") {
        orderUpdates.push({
          updateOne: {
            filter: { orderId: order.orderId },
            update: { paymentStatus: response.transaction_status },
          },
        });

        // Prepare to increment stock for each product in the order
        for (const item of order.products) {
          productUpdates.push({
            updateOne: {
              filter: { _id: item.productId },
              update: { $inc: { stock: item.qty } },
            },
          });
        }
      }
    }

    // Execute bulk updates if there are any expired orders
    if (orderUpdates.length > 0) {
      await Order.bulkWrite(orderUpdates, { session });
      await Product.bulkWrite(productUpdates, { session });
    }

    await session.commitTransaction();
    session.endSession();

    console.log(`${orderUpdates.length} orders updated to expired and stock restored.`);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error updating expired orders:", error);
  }
}
