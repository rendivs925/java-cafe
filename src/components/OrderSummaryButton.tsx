import { type ReactElement } from "react";
import { Button } from "./ui/button";
import useAppContext from "@/hooks/useAppContext";
import { ICart } from "@/models/Cart";
import WorkerBuilder from "@/worker/workerBuilder";
import cartWorkerScript from "@/worker/cartWorkerScript";

export default function OrderSummaryButton({
  optimisticCart,
}: {
  optimisticCart: ICart;
}): ReactElement {
  const { pushRoute } = useAppContext();
  const isDisabled = optimisticCart.products.length === 0;

  const handleCheckout = () => {
    pushRoute("/shipping?step=1");

    const worker = WorkerBuilder(cartWorkerScript);

    worker.postMessage({ cart: optimisticCart });

    worker.onmessage = (event) => {
      const { success, result, error } = event.data;
      if (success) {
        console.log("Cart updated successfully:", result);
      } else {
        console.error("Failed to update cart:", error);
      }
    };

    worker.onerror = (error) => {
      console.error("Worker error:", error.message);
    };
  };

  return (
    <Button
      size="default"
      variant="default"
      onClick={handleCheckout}
      disabled={isDisabled}
      className={`${isDisabled && "cursor-not-allowed"}`}
    >
      Checkout
    </Button>
  );
}
