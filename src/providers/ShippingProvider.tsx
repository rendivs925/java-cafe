"use client";
import { ReactNode, useState, type ReactElement } from "react";
import { createContext } from "use-context-selector";
import { ShippingContextType } from "@/types";

const shippingContextDefaultValues: ShippingContextType = {
  activeStep: 1,
  setActiveStep: () => {},
  incrementStep: () => {},
};

export const ShippingContext = createContext<ShippingContextType>(
  shippingContextDefaultValues,
);

export interface ShippingProviderProps {
  children: ReactNode;
}

export default function ShippingProvider({
  children,
}: ShippingProviderProps): ReactElement {
  const [activeStep, setActiveStep] = useState(1);

  const incrementStep = () => {
    setActiveStep((prevStep) => {
      if (prevStep === 3) return 3;
      return prevStep + 1;
    });
  };

  const contextValues: ShippingContextType = {
    activeStep,
    setActiveStep,
    incrementStep,
  };

  return (
    <ShippingContext.Provider value={contextValues}>
      {children}
    </ShippingContext.Provider>
  );
}
