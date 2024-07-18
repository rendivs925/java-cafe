"use client";
import useAppContext from "@/hooks/useAppContext";
import { CartProduct } from "@/types";
import { useEffect, useState, type ReactElement } from "react";
import { CardContent } from "./ui/card";
import useClientComponent from "@/hooks/useClientComponent";

export default function OrderSummaryContent(): ReactElement {
  const { cartProductList, formatNumber } = useAppContext();
  const isClient = useClientComponent();
  const [subHarga, setSubHarga] = useState(0);

  const cartProductsReducer = (
    accumulator: number,
    currentValue: CartProduct
  ): number => {
    return currentValue.price * currentValue.qty + accumulator;
  };

  useEffect(() => {
    setSubHarga(cartProductList.reduce(cartProductsReducer, 0));
  }, [cartProductList]);

  return (
    <>
      {isClient && (
        <CardContent className="pt-6 px-0">
          <p className="text-foreground m-0">
            Total item : {cartProductList.length}
          </p>
          <p className="text-foreground m-0">
            Sub harga : IDR {formatNumber(subHarga)}
          </p>
        </CardContent>
      )}
    </>
  );
}
