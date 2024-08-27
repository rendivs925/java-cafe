import { type ReactElement } from "react";
import { TableCell } from "./ui/table";
import { formatToRupiah } from "@/lib/formatToRupiah";

export interface TableCellFormattedNumberProps {
  price: number;
}

export default function TableCellFormattedNumber({
  price,
}: TableCellFormattedNumberProps): ReactElement {
  return <TableCell>{formatToRupiah(price)}</TableCell>;
}
