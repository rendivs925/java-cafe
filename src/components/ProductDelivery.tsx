import { type ReactElement } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RecentOrderList from "./RecentOrderList";

export interface RecentOrdersProps {}

export default function RecentOrders(props: RecentOrdersProps): ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mt-0">Recent Orders</CardTitle>
        <CardDescription>January - July 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <RecentOrderList />
      </CardContent>
    </Card>
  );
}
