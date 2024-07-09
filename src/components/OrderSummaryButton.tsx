"use client";
import { type ReactElement } from "react";
import { Button } from "./ui/button";
import useAppContext from "@/hooks/useAppContext";

export default function OrderSummaryButton(): ReactElement {
  const { moveRoute } = useAppContext();

  return (
    <>
      <Button
        size="sm"
        className="mt-8"
        variant="default"
        onClick={() => moveRoute("/shipping")}
      >
        Checkout
      </Button>
    </>
  );
}
