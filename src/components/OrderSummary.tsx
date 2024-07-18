import { type ReactElement } from "react";
import Line from "./Line";
import CardContainer from "./CardContainer";
import OrderSummaryButton from "./OrderSummaryButton";
import { CardFooter, CardHeader, CardTitle } from "./ui/card";
import OrderSummaryContent from "./OrderSummaryContent";

export default function OrderSummary(): ReactElement {
  return (
    <CardContainer className="px-6">
      <CardHeader className="px-0">
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <Line />
      <OrderSummaryContent />
      <Line />
      <CardFooter className="pt-6 px-0">
        <OrderSummaryButton />
      </CardFooter>
    </CardContainer>
  );
}
