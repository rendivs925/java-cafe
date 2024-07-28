import { type ReactElement } from "react";
import { TableCell } from "./ui/table";

export interface TableCellFormattedDateProps {
  createdAt: Date;
}

export default function TableCellFormattedDate({
  createdAt,
}: TableCellFormattedDateProps): ReactElement {
  function formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return <TableCell>{formatDate(createdAt)}</TableCell>;
}
