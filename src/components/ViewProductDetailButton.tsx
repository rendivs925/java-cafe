"use client";
import { type ReactElement } from "react";
import { Button } from "./ui/button";
import useAppContext from "@/hooks/useAppContext";
import { GrView } from "react-icons/gr";

export interface ViewProductDetailButton {
  productId: string | number;
}

export default function ViewProductDetailButton({
  productId,
}: ViewProductDetailButton): ReactElement {
  const { pushRoute } = useAppContext();
  const handleViewProduct = async () => {
    pushRoute(`/products/${productId}`);
  };

  return (
    <Button
      onClick={handleViewProduct}
      size="sm"
      variant="ghost"
      className="bg-transparent"
    >
      <GrView className="text-foreground text-lg" />
    </Button>
  );
}
