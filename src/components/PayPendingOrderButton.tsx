"use client";
import { useEffect, type ReactElement } from "react";
import { Button } from "./ui/button";
import { ISnap, ISnapResult } from "./Pesanan";
import { updateOrderDetailsAction } from "./updateOrderDetailsAction";
import { getOrderTokenAction } from "@/actions/getOrderTokenAction";
import { toast } from "./ui/use-toast";

export interface PayPendingOrderButtonProps {
  orderId: string;
  disabled: boolean;
}

export default function PayPendingOrderButton({
  orderId,
  disabled,
}: PayPendingOrderButtonProps): ReactElement {
  const handlePayPendingOrder = async () => {
    try {
      const response = await getOrderTokenAction({
        orderId,
      });

      console.log(response);

      if (
        typeof window !== "undefined" &&
        "snap" in window &&
        window.snap &&
        typeof (window.snap as ISnap).pay === "function"
      ) {
        (window.snap as ISnap).pay(response.token as string, {
          onSuccess: async (result: ISnapResult) => {
            try {
              console.log("Success");
              console.log(result);
              await updateOrderDetailsAction({ orderId });
            } catch (error) {
              console.error("Error in onSuccess callback:", error);
              toast({
                description: "Failed to update order details after success.",
              });
            }
          },
          onPending: async (result: ISnapResult) => {
            try {
              console.log("Pending");
              console.log(result);
              await updateOrderDetailsAction({ orderId });
            } catch (error) {
              console.error("Error in onPending callback:", error);
              toast({
                description: "Failed to update order details after pending.",
              });
            }
          },
          onError: async (result: ISnapResult) => {
            try {
              console.log("Error");
              console.log(result);
              await updateOrderDetailsAction({ orderId });
            } catch (error) {
              console.error("Error in onError callback:", error);
              toast({
                description: "Failed to update order details after error.",
              });
            }
          },
          onClose: async () => {
            try {
              console.log(
                "Customer closed the popup without finishing the payment"
              );
              await updateOrderDetailsAction({ orderId });
            } catch (error) {
              console.error("Error in onClose callback:", error);
              toast({
                description: "Failed to update order details after close.",
              });
            }
          },
        });
      } else {
        console.error("Snap.js is not loaded or pay function is unavailable.");
        toast({
          description: "Snap.js is not loaded or pay function is unavailable.",
        });
      }
    } catch (error) {
      console.error("Error in handlePayPendingOrder:", error);
      toast({ description: "Failed to retrieve order token." });
    }
  };

  useEffect(() => {
    const midtransScriptUrl = process.env.NEXT_PUBLIC_MIDTRANS_URL as string;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = process.env.NEXT_PUBLIC_CLIENT_KEY as string;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <Button
      disabled={disabled}
      className="mr-3"
      onClick={handlePayPendingOrder}
    >
      Bayar
    </Button>
  );
}
