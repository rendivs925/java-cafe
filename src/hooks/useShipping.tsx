"use client";

import { useEffect, useState } from "react";
import useShippingContext from "./useShippingContext";
import Pengiriman from "@/components/Pengiriman";
import Konfirmasi from "@/components/Konfirmasi";
import Pembayaran from "@/components/Pembayaran";

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
