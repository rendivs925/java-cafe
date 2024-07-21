"use client";
import { type ReactElement } from "react";
import { Button } from "./ui/button";
import useAppContext from "@/hooks/useAppContext";

export default function OrderSummaryButton(): ReactElement {
  const { moveRoute, cartProductList } = useAppContext();
  const isDisabled = cartProductList.length === 0;

  return (
    <Button
      size="default"
      variant="default"
      onClick={() => moveRoute("/shipping")}
      disabled={isDisabled}
      className={`${isDisabled && "cursor-not-allowed"}`}
    >
      Checkout
    </Button>
  );
}
