import { type ReactElement } from "react";
import { Button } from "./ui/button";

export interface OrderSummaryProps {}

export default function OrderSummary(props: OrderSummaryProps): ReactElement {
  return (
    <section className="bg-secondary rounded-lg p-8">
      <div>
        <h2>Order Summary</h2>
        <div className="h-[1px] w-full bg-muted-foreground/30 mt-6"></div>
        <p className="text-foreground">Total item : 3</p>
        <p className="text-foreground">Sub harga : Rp 120.000</p>
        <div className="h-[1px] w-full bg-muted-foreground/30 mt-6"></div>
        <Button size="sm" className="mt-8" variant="default">
          Checkout
        </Button>
      </div>
    </section>
  );
}
