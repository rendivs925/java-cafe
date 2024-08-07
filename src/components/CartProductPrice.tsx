"use client";
import useAppContext from "@/hooks/useAppContext";
import { type ReactElement } from "react";

export interface CartProductPriceProps {
  price: number;
  qty: number;
}

export default function CartProductPrice({
  price,
  qty,
}: CartProductPriceProps): ReactElement {
  const { formatNumber } = useAppContext();

  return (
    <>
      <h4 className="price font-medium mt-4">
        IDR {formatNumber(price * qty)}
      </h4>
    </>
  );
}
