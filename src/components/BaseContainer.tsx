import { ReactNode, type ReactElement } from "react";

export interface BaseContainerProps {
  children: ReactNode;
}

export default function BaseContainer({
  children,
}: BaseContainerProps): ReactElement {
  return (
    <section className="container box-border py-navbar rounded-lg">
      {children}
    </section>
  );
}
