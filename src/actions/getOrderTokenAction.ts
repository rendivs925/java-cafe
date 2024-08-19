"use server";
import Order from "@/models/Order";

interface getOrderTokenActionProps {
  orderId: string;
}

export async function getOrderTokenAction({
  orderId,
}: getOrderTokenActionProps) {
  try {
    const response = await Order.findOne({ orderId });

    return {
      status: "success",
      token: response?.token,
    };
  } catch (error) {
    const errorMessage = (error as { message: string }).message;
    console.log("Error:", errorMessage);

    return {
      status: "error",
      message: errorMessage,
    };
  }
}
