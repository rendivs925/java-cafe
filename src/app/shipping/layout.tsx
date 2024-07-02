import ProgressBar from "@/components/ProgressBar";
import ShippingProvider from "@/providers/ShippingProvider";
import { ReactNode, ReactElement } from "react";

export default function ShippingLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactElement {
  return (
    <>
      <ShippingProvider>
        <ProgressBar />
        {children}
      </ShippingProvider>
    </>
  );
}
