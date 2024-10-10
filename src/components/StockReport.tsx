import { type ReactElement } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StockReportTable from "./StockReportTable";
import { ProductType } from "./ProductsList";
import SelectShowing from "./SelectShowing";

export interface StockReportProps {
  items: ProductType[];
  totalItemsLength: number;
  page: string | string[];
  per_page: string | string[];
}

export default function StockReport({
  items,
  totalItemsLength,
  page,
  per_page,
}: StockReportProps): ReactElement {
  return (
    <Card className="bg-background shadow">
      <CardHeader className="flex-row justify-between items-start">
        <span>
          <CardTitle className="my-0">Inventory Report</CardTitle>
          <CardDescription className="mt-1.5">
            Summary of current stock and item availability
          </CardDescription>
        </span>
        <SelectShowing />
      </CardHeader>
      <CardContent>
        <StockReportTable
          page={page}
          per_page={per_page}
          items={items}
          totalItemsLength={totalItemsLength}
        />
      </CardContent>
    </Card>
  );
}
