"use server";
import { BASE_URL } from "@/constanst";
import midtransClient from "midtrans-client";
import { ICartProduct } from "@/models/Cart";
import Product from "@/models/Product";
import mongoose from "mongoose";

interface PaymentActionProps {
  orderId: string | number;
  grossAmount: number;
  firstName: string;
  email: string;
  phone: number;
  products: ICartProduct[];
}

export async function paymentAction({
  orderId,
  grossAmount,
  email,
  firstName,
  phone,
  products,
}: PaymentActionProps): Promise<{
  status: string;
  message: string;
  token?: string;
  dataPayment?: any;
}> {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY!,
      clientKey: process.env.CLIENT_KEY!,
    });

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      customer_details: {
        first_name: firstName,
        email,
        phone,
      },
      callbacks: {
        finish: `${BASE_URL}/confirmation`,
      },
      enabled_payments: [
        "mandiri_clickpay",
        "bca_clickpay",
        "bni_va",
        "bca_va",
        "permata_va",
        "other_va",
      ],
    };

    const transaction = await snap.createTransaction(parameter);

    if (!transaction || typeof transaction.token !== "string") {
      throw new Error("Failed to get transaction token from Midtrans.");
    }

    const bulkOps = products.map((cartProduct) => ({
      updateOne: {
        filter: {
          _id: cartProduct.productId,
          stock: { $gte: cartProduct.qty },
        },
        update: { $inc: { stock: -cartProduct.qty } },
      },
    }));

    const result = await Product.bulkWrite(bulkOps, { session });

    if (result.modifiedCount !== products.length) {
      throw new Error("Some products do not have enough stock.");
    }

    await session.commitTransaction();
    session.endSession();

    return {
      status: "success",
      message: "Token pembayaran berhasil dibuat.",
      token: transaction.token,
      dataPayment: transaction,
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("PaymentAction error:", error);

    return {
      status: "error",
      message: (error as Error).message,
    };
  }
}
