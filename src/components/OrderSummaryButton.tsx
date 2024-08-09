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
  const { pushRoute, user } = useAppContext();
  const isDisabled = optimisticCart.products.length === 0;

  const handleCheckout = async () => {
    await setCartAction(optimisticCart);
    pushRoute(`/shipping?user_id=${user._id}`);
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
