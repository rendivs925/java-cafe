import React, { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface SearchBarProps {
  // Add any props you need for the SearchBar component
}

export default function SearchBar(props: SearchBarProps): ReactElement {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="search" placeholder="Search here" />
      <Button type="submit" size="sm">
        Search
      </Button>
    </div>
  );
}
