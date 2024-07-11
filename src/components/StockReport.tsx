import { type ReactElement } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StockReportTable from "./StockReportTable";

export interface StockReportProps {}

export default function StockReport(props: StockReportProps): ReactElement {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mt-0">Stock Report</CardTitle>
        <CardDescription>Total 1200 items in the stock</CardDescription>
      </CardHeader>
      <CardContent>
        <StockReportTable />
      </CardContent>
    </Card>
  );
}
