"use client";

import { type ReactElement } from "react";
import { Button } from "./ui/button";
import { useAppContext } from "@/hooks";
import { AppContextType } from "@/types";
import Line from "./Line";
import FormContainer from "./FormContainer"

export interface OrderSummaryProps {}

export default function OrderSummary(props: OrderSummaryProps): ReactElement {
  const context: AppContextType | null = useAppContext();

  return (
    <FormContainer>
      <div>
        <h2>Order Summary</h2>
        <Line className="mt-6" />
        <p className="text-foreground">Total item : 3</p>
        <p className="text-foreground">Sub harga : Rp 120.000</p>
        <Line className="mt-6"/>
        <Button
          size="sm"
          className="mt-8"
          variant="default"
          onClick={() => context?.moveRoute("/shipping")}
        >
          Checkout
        </Button>
      </div>
    </FormContainer>
  );
}
