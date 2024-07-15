import { ReactNode, type ReactElement } from "react";

export interface DashboardTitleProps {
  children: ReactNode;
}

export default function DashboardTitle({
  children,
}: DashboardTitleProps): ReactElement {
  return <h2 className="mt-0 pb-0">{children}</h2>;
}
