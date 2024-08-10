import { type ReactElement } from "react";

export interface LineProps {
  className?: string;
}

export default function Line({ className = "" }: LineProps): ReactElement {
  return (
    <div
      className={`h-[1px] w-full box-border bg-muted-foreground/30 ${className}`}
    ></div>
  );
}
