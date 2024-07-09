"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAppContext from "@/hooks/useAppContext";

const selectItems = [
  {
    value: 7,
    label: "Last 7 days",
  },
  {
    value: 30,
    label: "Last 30 days",
  },
  {
    value: 60,
    label: "Last 60 days",
  },
  {
    value: 90,
    label: "Last 90 days",
  },
  {
    value: 0,
    label: new Date().getFullYear(),
  },
];

export default function SelectTotalSalesData() {
  const { handleSelectChange, totalDays } = useAppContext();

  return (
    <Select
      onValueChange={handleSelectChange}
      value={JSON.stringify(totalDays)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectItems.map(({ label, value }, index) => (
            <SelectItem key={index} value={JSON.stringify(value)}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
