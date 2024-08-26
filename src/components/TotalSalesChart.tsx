"use client";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useTotalSales from "@/hooks/useTotalSales";
import { useEffect } from "react";

export default function TotalSalesChart() {
  const { formatNumber, chartConfig, filteredData } = useTotalSales();

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
      <ChartContainer config={chartConfig}>
        <LineChart data={filteredData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <YAxis tickFormatter={(tick) => formatNumber(tick)} />

          <ChartTooltip
            cursor={false}
            itemStyle={{ background: "red" }}
            content={
              <ChartTooltipContent
                formatter={(tick) =>
                  "Total sales: " + formatNumber(Number(tick))
                }
                hideLabel
              />
            }
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeOpacity={0.4}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
}
