import useAppContext from "@/hooks/useAppContext";
import { useEffect, useState, type ReactElement } from "react";
import { CardContent } from "./ui/card";
import { ICart, ICartProduct } from "@/models/Cart";

export default function OrderSummaryContent({
  optimisticCart,
}: {
  optimisticCart: ICart;
}): ReactElement {
  const { formatNumber } = useAppContext();
  const [subHarga, setSubHarga] = useState(0);

  const cartProductsReducer = (
    accumulator: number,
    currentValue: ICartProduct
  ): number => {
    return (
      currentValue.price * (currentValue as { qty: number }).qty + accumulator
    );
  };

  useEffect(() => {
    if (optimisticCart?.products) {
      setSubHarga(optimisticCart?.products.reduce(cartProductsReducer, 0));
    }
  }, [optimisticCart.products]);

  return (
    <>
      <CardContent className="pt-6 px-0">
        <p className="text-foreground m-0">
          Total item : {optimisticCart.products.length}
        </p>
        <p className="text-foreground m-0">
          Sub harga : IDR {formatNumber(subHarga)}
        </p>
      </CardContent>
    </>
  );
}
