import { type ReactElement } from "react";
import Line from "./Line";
import FormContainer from "./FormContainer";
import OrderSummaryButton from "./OrderSummaryButton";

export interface OrderSummaryProps {}

export default function OrderSummary(props: OrderSummaryProps): ReactElement {
  return (
    <FormContainer>
      <div>
        <h2>Order Summary</h2>
        <Line className="mt-6" />
        <p className="text-foreground">Total item : 3</p>
        <p className="text-foreground">Sub harga : Rp 120.000</p>
        <Line className="mt-6" />
        <OrderSummaryButton />
      </div>
    </FormContainer>
  );
}
