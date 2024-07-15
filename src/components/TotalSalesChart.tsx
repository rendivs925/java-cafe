"use client";
import {
  Bar,
  BarChart,
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

export default function TotalSalesChart() {
  const { formatNumber, chartConfig, filteredData } = useTotalSales();

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={filteredData}>
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
            content={
              <ChartTooltipContent
                formatter={(tick) =>
                  "Total sales : " + formatNumber(Number(tick))
                }
                hideLabel
              />
            }
          />
          <Bar dataKey="value" fill="var(--primary)" radius={8} />
        </BarChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
}
