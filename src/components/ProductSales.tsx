import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import ProductSalesList from "./ProductSalesList";
import ProductSalesChart from "./ProductSalesChart";

const chartData = [
  {
    product: "luwakCoffee",
    name: "Luwak Coffee",
    totalSales: 40000000,
    fill: "var(--color-luwakCoffee)",
    color: "hsl(var(--chart-2))",
  },
  {
    product: "greenTea",
    totalSales: 25000000,
    name: "Green Tea",
    fill: "var(--color-greenTea)",
    color: "hsl(var(--chart-1))",
  },
  {
    product: "cappucinoCoffee",
    totalSales: 15000000,
    name: "Cappucino Coffee",
    fill: "var(--color-cappucinoCoffee)",
    color: "hsl(var(--chart-3))",
  },
];

const chartConfig = {
  totalSales: {
    label: "Total Product Sales",
  },
  luwakCoffee: {
    label: "Luwak Coffee",
    color: "hsl(var(--chart-2))",
  },
  greenTea: {
    label: "Green Tea",
    color: "hsl(var(--chart-1))",
  },
  cappucinoCoffee: {
    label: "Cappucino Coffee",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function ProductSales() {
  // const totalSales = React.useMemo(() => {
  //   return chartData.reduce((acc, curr) => acc + curr.totalSales, 0);
  // }, []);

  return (
    <Card className="overflow-visible bg-background flex flex-col">
      <CardHeader className="items-start pb-0">
        <CardTitle className="mt-0">Product Sales</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pt-6">
        <div className="grid grid-rows-productSales items-start h-full">
          <ProductSalesList chartData={chartData} />
          <ProductSalesChart chartData={chartData} chartConfig={chartConfig} />
        </div>
      </CardContent>
    </Card>
  );
}
