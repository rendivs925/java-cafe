"use server";
import { BASE_URL } from "@/constanst";
import midtransClient from "midtrans-client";

interface PaymentActionProps {
  orderId: string | number;
  grossAmount: number;
  firstName: string;
  email: string;
  phone: number;
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
}: PaymentActionProps): Promise<{
  status: string;
  message: string;
  token?: string;
  dataPayment?: {
    midtransResponse: any;
  };
}> {
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

    const transaction = await snap.createTransaction(parameter);
    const transactionToken = (transaction as TransactionResponse).token;

    return {
      status: "success",
      message: "Pembayaran sudah berhasil.",
      token: transactionToken,
      dataPayment: {
        midtransResponse: transaction,
      },
    };
  } catch (error) {
    console.error((error as Error).message);

    return {
      status: "error",
      message: (error as Error).message,
    };
  }
}
