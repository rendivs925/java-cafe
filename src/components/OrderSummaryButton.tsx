import { type ReactElement, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import useAppContext from "@/hooks/useAppContext";
import { ICart } from "@/models/Cart";
import { setCartAction } from "@/actions/setCartAction";

export default function OrderSummaryButton({
  optimisticCart,
}: {
  optimisticCart: ICart;
}): ReactElement {
  const { pushRoute } = useAppContext();
  const isDisabled = optimisticCart.products.length === 0;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCheckout = () => {
    pushRoute("/shipping?step=1");

    timeoutRef.current = setTimeout(() => {
      (async () => {
        try {
          await setCartAction(optimisticCart);
        } catch (error) {
          console.error("Failed to update cart:", error);
        }
      })();
    }, 200);

    window.addEventListener("beforeunload", handleClearTimeout);
  };

  const handleClearTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
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
