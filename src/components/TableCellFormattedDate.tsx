import { type ReactElement } from "react";
import { TableCell } from "./ui/table";

export interface TableCellFormattedDateProps {
  createdAt: Date;
}

export default function TableCellFormattedDate({
  createdAt,
}: TableCellFormattedDateProps): ReactElement {
  function formatDate(dateInput: string | Date): string {
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

    const formattedDate = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <TableCell className="min-w-[160px]">{formatDate(createdAt)}</TableCell>
  );
}
