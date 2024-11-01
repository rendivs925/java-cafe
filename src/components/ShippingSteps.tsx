"use client";

import useAppContext from "@/hooks/useAppContext";
import useClientComponent from "@/hooks/useClientComponent";
import useShippingContext from "@/hooks/useShippingContext";
import { ICart } from "@/models/Cart";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Pengiriman = dynamic(() => import("@/components/Pengiriman"));
const Konfirmasi = dynamic(() => import("@/components/Konfirmasi"));
const Pembayaran = dynamic(() => import("@/components/Pembayaran"));

export default function ShippingSteps({ cart }: { cart: ICart }) {
  const { activeStep, setActiveStep } = useShippingContext();
  const { pushRoute, totalItems } = useAppContext();
  const isClient = useClientComponent();
  const searchParams = useSearchParams();
  const currStep = searchParams.get("step") || "1"; // Default to "1" if currStep is null

  useEffect(() => {
    const stepNumber = Number(currStep);

    setActiveStep(stepNumber);
  }, [currStep]);

  useEffect(() => {
    pushRoute(`/shipping/?step=${activeStep}`);
  }, [activeStep]);

  useEffect(() => {
   if(totalItems === 0) {
      pushRoute("/")
    }
  }, [])

  if (!isClient) return null; // Handle non-client cases

  if (currStep === "1") return <Pengiriman />;
  if (currStep === "2") return <Konfirmasi cart={cart} />;

  // Optionally handle invalid steps or fallback UI
  return <div>Invalid step</div>;
}
