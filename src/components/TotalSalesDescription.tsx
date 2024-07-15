"use client";
import { type ReactElement } from "react";
import { CardDescription } from "./ui/card";
import useTotalSales from "@/hooks/useTotalSales";

export default function TotalSalesDescription(): ReactElement {
  const { firstMonth, lastMonth, currentYear } = useTotalSales();

  return (
    <CardDescription>
      {firstMonth} - {lastMonth} {currentYear}
    </CardDescription>
  );
}
