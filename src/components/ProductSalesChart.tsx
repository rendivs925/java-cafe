"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer } from "./ui/chart";
import ProductSalesTooltip from "./ProductSalesTooltip";
import { ChartData } from "@/types";

export default function ProductSalesChart({
  chartData,
  chartConfig,
}: {
  chartData: ChartData[];
  chartConfig: {
    totalSales: {
      label: string;
    };
    luwakCoffee: {
      label: string;
      color: string;
    };
    greenTea: {
      label: string;
      color: string;
    };
    cappucinoCoffee: {
      label: string;
      color: string;
    };
  };
}) {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      minHeight={150}
      maxHeight={200}
    >
      <ChartContainer config={chartConfig} className="aspect-square">
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            left: 0,
          }}
        >
          <YAxis
            dataKey="product"
            type="category"
            tickLine={false}
            tickMargin={10}
            width={80}
            axisLine={false}
            tickFormatter={(value) =>
              chartConfig[value as keyof typeof chartConfig]?.label
            }
          />
          <XAxis dataKey="totalSales" type="number" hide />
          <Bar dataKey="totalSales" layout="vertical" radius={5} />
          <ProductSalesTooltip />
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
}
