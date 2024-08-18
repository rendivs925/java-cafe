import { ReactNode, type ReactElement } from "react";

export interface BaseHeaderProps {
  children?: ReactNode;
  title: string;
  className?: string;
}

export default function BaseHeader({
  title,
  children,
  className,
}: BaseHeaderProps): ReactElement {
  return (
    <div className={`pt-navbar ${className}`}>
      <h1 className="text-3xl font-bold">{title}</h1>
      {children}
    </div>
  );
}
