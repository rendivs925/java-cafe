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
    } catch (error) {
      toast({
        description: `An error occurred while syncing the order: ${error}`,
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
