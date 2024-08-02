"use client";
import { Suspense, useEffect, type ReactElement } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";

const selectShowingItems = [
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
  {
    value: 4,
  },
  {
    value: 5,
  },
];

export default function SelectShowing(): ReactElement {
  const [totalItemsPerPage, setTotalItemsPerPage] = useLocalStorage(
    "totalItemsPerPage",
    "1"
  );
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelectOnchange = (value: string) => {
    setTotalItemsPerPage(value);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("per_page", totalItemsPerPage);

    router.push(`${pathname}?${params.toString()}`);
  }, [totalItemsPerPage]);

  return (
    <Suspense>
      <div className="flex gap-6 items-center">
        <p className="mt-0">Showing</p>
        <Select
          defaultValue={totalItemsPerPage}
          onValueChange={handleSelectOnchange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="1" />
          </SelectTrigger>
          <SelectContent>
            {selectShowingItems.map(({ value }, index) => (
              <SelectItem key={index} value={`${value}`}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Suspense>
  );
}
