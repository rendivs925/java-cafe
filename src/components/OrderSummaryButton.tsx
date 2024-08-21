import { type ReactElement, useState } from "react";
import { Button } from "./ui/button";
import useAppContext from "@/hooks/useAppContext";
import { ICart } from "@/models/Cart";
import { setCartAction } from "@/actions/setCartAction";
import LoadingButton from "./LoadingButton";

export default function OrderSummaryButton({
  optimisticCart,
}: {
  optimisticCart: ICart;
}): ReactElement {
  const { pushRoute } = useAppContext();
  const [loading, setLoading] = useState(false); // Add loading state
  const isDisabled = optimisticCart.products.length === 0 || loading;

  const handleCheckout = async () => {
    setLoading(true); // Set loading state to true

    try {
      await setCartAction(optimisticCart);
      pushRoute("/shipping?step=1");
    } catch (error) {
      console.error("Failed to update cart:", error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <>
      {loading ? (
        <LoadingButton className="w-fit">Processing...</LoadingButton>
      ) : (
        <Button
          size="default"
          disabled={isDisabled}
          variant="default"
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      )}
    </>
  );
}
