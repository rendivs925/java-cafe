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
    <Card className="bg-background shadow">
      <CardHeader>
        <CardTitle className="mt-0">Recent Orders</CardTitle>
        <CardDescription>Recent orders for the last 7 days</CardDescription>
      </CardHeader>
      <CardContent
        className="max-h-[488px] overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        <RecentOrderList orders={orders} />
      </CardContent>
    </Card>
  );
}
