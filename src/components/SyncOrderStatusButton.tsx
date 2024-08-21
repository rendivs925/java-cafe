"use client";
import { type ReactElement } from "react";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import { updateOrderDetailsAction } from "./updateOrderDetailsAction";
import { toast } from "./ui/use-toast";

export interface SyncOrderStatusButtonProps {
  orderId: string;
  disabled: boolean;
}

export default function SyncOrderStatusButton({
  orderId,
  disabled,
}: SyncOrderStatusButtonProps): ReactElement {
  const handleSyncOrder = async () => {
    try {
      await updateOrderDetailsAction({ orderId });
      toast({
        description: "Order synced successfully.",
      });
    } catch (error) {
      toast({
        description: `Failed to sync order: ${
          (error as { message: string }).message || error
        }`,
      });
    }
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className="bg-transparent"
      disabled={disabled}
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
