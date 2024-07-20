import { ReactNode, type ReactElement } from "react";

export interface DashboardContainerProps {
  children: ReactNode;
  className?: string;
}

export default function DashboardContainer({
  children,
  className = "",
}: DashboardContainerProps): ReactElement {
  return (
    <section
      className={`w-full max-h-svh py-12 px-10 overflow-y-auto ${className}`}
    >
      {children}
    </section>
  );
}
