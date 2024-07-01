import { ProgressBar } from "@/components";
import { ShippingProvider } from "@/providers";
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
