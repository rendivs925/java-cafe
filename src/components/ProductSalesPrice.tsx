"use client";
import { type ReactElement } from "react";
import { CardDescription } from "./ui/card";
import useAppContext from "@/hooks/useAppContext";

export interface ProductSalesPriceProps {
  price: number;
}

export default function ProductSalesPrice({
  price,
}: ProductSalesPriceProps): ReactElement {
  const { formatNumber } = useAppContext();

  return (
    <CardDescription className="mt-0 font-medium text-muted-foreground">
      {formatNumber(price)}
    </CardDescription>
  );
}
