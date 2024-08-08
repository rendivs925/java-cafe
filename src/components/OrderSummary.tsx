import Line from "./Line";
import CardContainer from "./CardContainer";
import OrderSummaryButton from "./OrderSummaryButton";
import { CardFooter, CardHeader, CardTitle } from "./ui/card";
import OrderSummaryContent from "./OrderSummaryContent";
import { ICart } from "@/models/Cart";

export default function OrderSummary({
  optimisticCart,
}: {
  optimisticCart: ICart;
}) {
  return (
    <CardContainer className="px-6">
      <CardHeader className="px-0">
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <Line />
      <OrderSummaryContent optimisticCart={optimisticCart} />
      <Line />
      <CardFooter className="pt-6 px-0">
        <OrderSummaryButton optimisticCart={optimisticCart} />
      </CardFooter>
    </CardContainer>
  );
}
