import { type ReactElement } from "react";
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

  const handleCheckout = () => {
    pushRoute("/shipping?step=1");

    setTimeout(() => {
      (async () => {
        try {
          await setCartAction(optimisticCart);
        } catch (error) {
          console.error("Failed to update cart:", error);
        }
      })();
    }, 1000);
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
