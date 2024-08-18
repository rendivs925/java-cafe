"use client";
import { type ReactElement } from "react";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import { updateOrderDetailsAction } from "./updateOrderDetailsAction";

export interface SyncOrderStatusButtonProps {
  orderId: string;
}

export default function SyncOrderStatusButton({
  orderId,
}: SyncOrderStatusButtonProps): ReactElement {
  const handleSyncOrder = async () => {
    const orderStatusResponse = await updateOrderDetailsAction({
      orderId,
    });

    console.log(orderStatusResponse);

    if (!orderStatusResponse.token) return;

    window.snap.pay(orderStatusResponse.token, {
      onSuccess: function (result) {
        console.log("success");
        console.log(result);
      },
      onPending: function (result) {
        console.log("pending");
        console.log(result);
      },
      onError: function (result) {
        console.log("error");
        console.log(result);
      },
      onClose: function () {
        console.log("customer closed the popup without finishing the payment");
      },
    });
    console.log("Order Status:", orderStatusResponse);
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className="bg-transparent"
      onClick={handleSyncOrder}
    >
      <RefreshCcw
        className="text-foreground text-lg"
        size={24}
        color="hsl(var(--foreground))"
      />
    </Button>
  );
}
