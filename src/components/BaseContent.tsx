import { ReactNode, type ReactElement } from "react";

export interface BaseContentProps {
  children: ReactNode;
}

export default function BaseContent({
  children,
}: BaseContentProps): ReactElement {
  return <div className="bg-background p-6 rounded-lg mt-8">{children}</div>;
}
