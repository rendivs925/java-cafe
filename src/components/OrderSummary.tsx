import { type ReactElement } from "react";
import Line from "./Line";
import CardContainer from "./CardContainer";
import OrderSummaryButton from "./OrderSummaryButton";
import { CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

export default function OrderSummary(): ReactElement {
  return (
    <CardContainer className="px-6">
      <CardHeader className="px-0">
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <Line />
      <CardContent className="pt-6 px-0">
        <p className="text-foreground m-0">Total item : 3</p>
        <p className="text-foreground m-0">Sub harga : Rp 120.000</p>
      </CardContent>
      <Line />
      <CardFooter className="pt-6 px-0">
        <OrderSummaryButton />
      </CardFooter>
    </CardContainer>
  );
}
