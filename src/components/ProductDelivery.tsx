import { type ReactElement } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RecentOrderList from "./RecentOrderList";
import { INewOrder } from "@/actions/getAllOrdersAction";

export interface RecentOrdersProps {
  orders: INewOrder[];
}

export default function RecentOrders({
  orders,
}: RecentOrdersProps): ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mt-0">Recent Orders</CardTitle>
        <CardDescription>Recent orders for the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <RecentOrderList orders={orders} />
      </CardContent>
    </Card>
  );
}
