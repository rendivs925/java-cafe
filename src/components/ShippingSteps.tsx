"use client";
import useClientComponent from "@/hooks/useClientComponent";
import useShippingContext from "@/hooks/useShippingContext";
import { ICart } from "@/models/Cart";
import dynamic from "next/dynamic";
const Pengiriman = dynamic(() => import("@/components/Pengiriman"));
const Konfirmasi = dynamic(() => import("@/components/Konfirmasi"));
const Pembayaran = dynamic(() => import("@/components/Pembayaran"));

export default function ShippingSteps({ cart }: { cart: ICart }) {
  const { activeStep } = useShippingContext();
  const isClient = useClientComponent();

  if (activeStep === 1 && isClient) return <Pengiriman />;
  if (activeStep === 2 && isClient) return <Konfirmasi cart={cart} />;
  if (activeStep === 3 && isClient) return <Pembayaran />;
}
