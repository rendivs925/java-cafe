import Line from "./Line";
import CardContainer from "./CardContainer";
import OrderSummaryButton from "./OrderSummaryButton";
import { CardFooter, CardHeader, CardTitle } from "./ui/card";
import OrderSummaryContent from "./OrderSummaryContent";
import { getUserCartAction } from "@/actions/getUserCartAction";

export default async function OrderSummary({ userId }: { userId: string }) {
  const data = await getUserCartAction(userId);

  return (
    <CardContainer className="px-6">
      <CardHeader className="px-0">
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <Line />
      <OrderSummaryContent cart={data.cart} />
      <Line />
      <CardFooter className="pt-6 px-0">
        <OrderSummaryButton />
      </CardFooter>
    </CardContainer>
  );
}
