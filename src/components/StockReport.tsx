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
    <Card>
      <CardHeader className="flex-row justify-between">
        <span>
          <CardTitle className="my-0">Stock Report</CardTitle>
          <CardDescription className="mt-1.5">
            Overview items in the stock
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
