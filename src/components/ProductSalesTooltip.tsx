"use client";
import { type ReactElement } from "react";
import { ChartTooltip, ChartTooltipContent } from "./ui/chart";
import useAppContext from "@/hooks/useAppContext";

export interface ProductSalesTooltipProps {}

export default function ProductSalesTooltip(
  props: ProductSalesTooltipProps
): ReactElement {
  const { formatNumber } = useAppContext();

  return (
    <ChartTooltip
      cursor={false}
      content={
        <ChartTooltipContent
          formatter={(tick) => "Total sales : " + formatNumber(Number(tick))}
          hideLabel
        />
      }
    />
  );
}
