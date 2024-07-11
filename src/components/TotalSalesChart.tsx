"use client";

import useAppContext from "@/hooks/useAppContext";
import SelectTotalSalesData from "./SelectTotalSalesData";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useEffect, useState } from "react";

const data = [
  { value: 100000, date: new Date(2024, 6, 1) },
  { value: 900000, date: new Date(2024, 6, 2) },
  { value: 300000, date: new Date(2024, 6, 3) },
  { value: 700000, date: new Date(2024, 6, 4) },
  { value: 400000, date: new Date(2024, 6, 5) },
  { value: 1200000, date: new Date(2024, 6, 6) },
  { value: 1000000, date: new Date(2024, 5, 19) },
  { value: 1200000, date: new Date(2024, 5, 20) },
  { value: 1800000, date: new Date(2024, 5, 21) },
  { value: 1900000, date: new Date(2024, 5, 22) },
  { value: 2000000, date: new Date(2024, 5, 23) },
  { value: 2100000, date: new Date(2024, 5, 24) },
  { value: 1100000, date: new Date(2024, 5, 25) },
  { value: 2300000, date: new Date(2024, 5, 26) },
  { value: 2400000, date: new Date(2024, 4, 19) },
  { value: 2500000, date: new Date(2024, 4, 20) },
  { value: 1000000, date: new Date(2024, 4, 21) },
  { value: 2700000, date: new Date(2024, 4, 22) },
  { value: 6000000, date: new Date(2024, 4, 23) },
  { value: 2900000, date: new Date(2024, 4, 24) },
  { value: 3000000, date: new Date(2024, 4, 25) },
  { value: 3100000, date: new Date(2024, 4, 26) },
  { value: 3200000, date: new Date(2024, 3, 19) },
  { value: 1300000, date: new Date(2024, 3, 20) },
  { value: 3400000, date: new Date(2024, 3, 21) },
  { value: 3500000, date: new Date(2024, 3, 22) },
  { value: 3600000, date: new Date(2024, 3, 23) },
  { value: 3700000, date: new Date(2024, 3, 24) },
  { value: 3800000, date: new Date(2024, 3, 25) },
  { value: 3900000, date: new Date(2024, 3, 26) },
  { value: 5000000, date: new Date(2024, 2, 19) },
  { value: 4100000, date: new Date(2024, 2, 20) },
  { value: 1200000, date: new Date(2024, 2, 21) },
  { value: 4300000, date: new Date(2024, 2, 22) },
  { value: 4400000, date: new Date(2024, 2, 23) },
  { value: 4500000, date: new Date(2024, 2, 24) },
  { value: 4600000, date: new Date(2024, 2, 25) },
  { value: 4700000, date: new Date(2024, 2, 26) },
  { value: 4800000, date: new Date(2024, 1, 19) },
  { value: 1200000, date: new Date(2024, 1, 20) },
  { value: 5000000, date: new Date(2024, 1, 21) },
  { value: 5100000, date: new Date(2024, 1, 22) },
  { value: 5200000, date: new Date(2024, 1, 23) },
  { value: 5300000, date: new Date(2024, 1, 24) },
  { value: 5400000, date: new Date(2024, 1, 25) },
  { value: 9500000, date: new Date(2024, 1, 26) },
  { value: 9000000, date: new Date(2024, 1, 25) },
  { value: 9100000, date: new Date(2024, 1, 24) },
];

const chartConfig = {} satisfies ChartConfig;

export default function TotalSalesChart() {
  const { getTotalSalesData, totalDays, formatNumber, formatDate } =
    useAppContext();
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    if (totalDays === 0) {
      setFilteredData(data);
    } else {
      setFilteredData(getTotalSalesData(data, totalDays));
    }
  }, [totalDays]);

  return (
    <Card className="total-sales" key={totalDays}>
      <CardHeader className="grid grid-cols-totalSales items-start">
        <div className="space-y-1">
          <CardTitle>Total Sales</CardTitle>
          <CardDescription className="mt-0">
            January - June 2024
          </CardDescription>
        </div>
        <SelectTotalSalesData />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={filteredData}
              margin={{
                top: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <YAxis tickFormatter={(tick) => formatNumber(tick)} />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(tick) => formatDate(tick)}
              />
              <Tooltip
                cursor={false}
                contentStyle={{ backgroundColor: "hsl(var(--background))" }}
                formatter={(value) => formatNumber(value as number)}
              />
              <Line
                dataKey="value"
                type="natural"
                stroke="hsl(var(--foreground))"
                name="Total Sales"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
