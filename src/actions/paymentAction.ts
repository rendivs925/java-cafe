"use server";
import { BASE_URL } from "@/constanst";
import midtransClient from "midtrans-client";
import { ICartProduct } from "@/models/Cart";
import Product from "@/models/Product";
import mongoose from "mongoose"; // Import mongoose for session management

interface PaymentActionProps {
  orderId: string | number;
  grossAmount: number;
  firstName: string;
  email: string;
  phone: number;
  products: ICartProduct[];
}

interface TransactionResponse {
  token: string;
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
  dataPayment?: {
    midtransResponse: any;
  };
}> {
  const session = await mongoose.startSession(); // Start a session for the transaction
  session.startTransaction(); // Start the transaction

  try {
    // Create an instance of Midtrans Snap
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY!,
      clientKey: process.env.CLIENT_KEY!,
    });

    // Prepare the payment parameter
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
      callback: {
        finish: `${BASE_URL}/confirmation`,
      },
      enabled_payments: [
        "mandiri_clicpay",
        "bca_clicpay",
        "bni_va",
        "bca_va",
        "permata_va",
        "other_va",
      ],
    };

    // Create the payment transaction
    const transaction = await snap.createTransaction(parameter);
    const transactionToken = (transaction as TransactionResponse).token;

    // Prepare bulk write operations
    const bulkOps = products.map((cartProduct) => ({
      updateOne: {
        filter: { _id: cartProduct.productId, stock: { $gte: cartProduct?.qty as number || 0 } },
        update: { $inc: { stock: -(cartProduct as { qty: number })?.qty } },
      },
    }));

    // Execute the bulk write operation
    const result = await Product.bulkWrite(bulkOps, { session });

    // Check if any updates were made
    if (result.modifiedCount !== products.length) {
      throw new Error("Some products do not have enough stock.");
    }

    // Commit the transaction if everything went well
    await session.commitTransaction();
    session.endSession(); // End the session

    return {
      status: "success",
      message: "Pembayaran sudah berhasil.",
      token: transactionToken,
      dataPayment: {
        midtransResponse: transaction,
      },
    };
  } catch (error) {
    await session.abortTransaction(); // Abort the transaction on error
    session.endSession(); // End the session
    console.error((error as Error).message);

    return {
      status: "error",
      message: (error as Error).message,
    };
  }
}
