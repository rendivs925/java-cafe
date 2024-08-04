"use server";
import midtransClient from "midtrans-client";

interface paymentActionProps {
  orderId: string | number;
  grossAmount: number;
  firstName: string;
  email: string;
  phone: number;
}

export async function paymentAction({
  orderId,
  grossAmount,
  email,
  firstName,
  phone,
}: paymentActionProps) {
  console.log("Proses Pembayaran");

  try {
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
      clientKey: process.env.CLIENT_KEY,
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
      enabled_payment: [
        "mandiri_clicpay",
        "bca_clicpay",
        "bni_va",
        "bca_va",
        "permata_va",
        "other_va",
      ],
    };

    return snap
      .createTransaction(parameter)
      .then((transaction: unknown) => {
        const dataPayment = {
          midtransResponse: JSON.stringify(transaction),
        };

        const transactionToken = (transaction as { token: string }).token;

        return {
          status: "success",
          message: "Pembayaran sudah berhasil.",
          token: transactionToken,
          dataPayment,
        };
      })
      .catch((error: unknown) => {
        console.log((error as { message: string }).message);

        return {
          status: "error",
          message: (error as { message: string }).message,
        };
      });
  } catch (error) {}
}
