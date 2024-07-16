import { type ReactElement } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectShowingProps {}

const selectShowingItems = [
  {
    value: 10,
  },
  {
    value: 20,
  },
  {
    value: 30,
  },
  {
    value: 40,
  },
  {
    value: 50,
  },
];

export default function SelectShowing(props: SelectShowingProps): ReactElement {
  return (
    <div className="flex gap-6 items-center">
      <p className="mt-0">Showing</p>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="10" />
        </SelectTrigger>
        <SelectContent>
          {selectShowingItems.map(({ value }, index) => (
            <SelectItem key={index} value={`${value}`}>{value}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
