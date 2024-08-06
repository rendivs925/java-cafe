"use client";
import useAppContext from "@/hooks/useAppContext";
import { useEffect, useState, type ReactElement } from "react";
import { CardContent } from "./ui/card";
import useClientComponent from "@/hooks/useClientComponent";
import { ICartProduct } from "@/models/Cart";

export default function OrderSummaryContent(): ReactElement {
  const { cart, formatNumber } = useAppContext();
  const isClient = useClientComponent();
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
    if (cart?.products) {
      setSubHarga(cart?.products.reduce(cartProductsReducer, 0));
    }
  }, [cart]);

  return (
    <>
      {isClient && (
        <CardContent className="pt-6 px-0">
          <p className="text-foreground m-0">
            Total item : {cart?.products?.length || 0}
          </p>
          <p className="text-foreground m-0">
            Sub harga : IDR {formatNumber(subHarga)}
          </p>
        </CardContent>
      )}
    </>
  );
}
