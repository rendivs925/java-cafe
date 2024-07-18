"use client";

import useShippingContext from "./useShippingContext";
import dynamic from "next/dynamic";

const Pengiriman = dynamic(() => import("@/components/Pengiriman"));
const Konfirmasi = dynamic(() => import("@/components/Konfirmasi"));
const Pembayaran = dynamic(() => import("@/components/Pembayaran"));

export default function useShipping() {
  const { activeStep } = useShippingContext();

  const renderStep = () => {
    if (activeStep === 1) return <Pengiriman />;
    if (activeStep === 2) return <Konfirmasi />;
    if (activeStep === 3) return <Pembayaran />;
  };

  const renderContent = () => {
    return <div className="container">{renderStep()}</div>;
  };

  return renderContent;
}
