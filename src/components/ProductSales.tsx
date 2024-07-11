"use client";

import * as React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useAppContext from "@/hooks/useAppContext";
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
  const { formatNumber } = useAppContext();
  const totalSales = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.totalSales, 0);
  }, []);

  return (
    <Card className="overflow-visible bg-background flex flex-col">
      <CardHeader className="items-start pb-0">
        <CardTitle className="mt-0">Product Sales</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="grid grid-rows-productSales items-start h-full mt-6">
          <ul className="w-full order-2 space-y-1 place-self-start mt-2">
            {chartData.map((data) => (
              <li className="grid gap-4 grid-cols-productSalesDetail items-center">
                <div
                  style={{ background: data.color }}
                  className="h-4 w-9 rounded-lg"
                ></div>
                <CardDescription className="mt-0">{data.name}</CardDescription>
                <CardDescription className="mt-0 font-medium text-muted-foreground">
                  {formatNumber(data.totalSales)}
                </CardDescription>
              </li>
            ))}
          </ul>
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
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      formatter={(tick) =>
                        "Total sales : " + formatNumber(Number(tick))
                      }
                      hideLabel
                    />
                  }
                />
                <Bar dataKey="totalSales" layout="vertical" radius={5} />
              </BarChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
