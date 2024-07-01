"use client";

import { useEffect, useState } from "react";
import useShippingContext from "./useShippingContext";
import { Konfirmasi, Pembayaran, Pengiriman } from "@/components";

export default function useShipping() {
  const { activeStep, setActiveStep } = useShippingContext();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderStep = () => {
    if (activeStep === 1) return <Pengiriman />;
    if (activeStep === 2) return <Konfirmasi />;
    if (activeStep === 3) return <Pembayaran />;
  };

  const renderContent = () => {
    return (
      <>{isClient ? <div className="container">{renderStep()}</div> : null}</>
    );
  };

  return renderContent;
}
