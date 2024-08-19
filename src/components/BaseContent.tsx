import { ReactNode, type ReactElement } from "react";

export interface BaseContentProps {
  children: ReactNode;
  className?: string;
}

export default function BaseContent({
  children,
  className,
}: BaseContentProps): ReactElement {
  return <div className={`mt-12 ${className}`}>{children}</div>;
}
