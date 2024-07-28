"use client";
import useAppContext from "@/hooks/useAppContext";
import { type ReactElement } from "react";
import { TableCell } from "./ui/table";

export interface TableCellFormattedNumberProps {
  price: number;
}

export default function TableCellFormattedNumber({
  price,
}: TableCellFormattedNumberProps): ReactElement {
  const { formatNumber } = useAppContext();

  return <TableCell>{formatNumber(price)}</TableCell>;
}
