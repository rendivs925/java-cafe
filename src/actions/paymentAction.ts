"use server";
import midtransClient from "midtrans-client";

interface paymentActionProps {
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
}: paymentActionProps): Promise<{
  status: string;
  message: string;
  token?: string;
  dataPayment?: {
    midtransResponse: string;
  };
}> {
  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY!,
      clientKey: process.env.CLIENT_KEY!,
    });

    const parameter = {
      transaction_details: { order_id: orderId, gross_amount: grossAmount },
      customer_details: {
        first_name: firstName,
        email,
        phone,
      },
      callback: {
        finish: `${process.env.DOMAIN}`,
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
