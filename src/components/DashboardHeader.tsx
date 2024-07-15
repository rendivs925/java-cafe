import { ReactNode, type ReactElement } from "react";

export interface DashboardHeaderProps {
  children: ReactNode;
  className?: string;
}

export default function DashboardHeader({
  children,
  className,
}: DashboardHeaderProps): ReactElement {
  return <div className={`pt-[12px] ${className}`}>{children}</div>;
}
