"use client";

import { type ReactElement } from "react";
import useShippingContext from "@/hooks/useShippingContext";

interface StepProps {
  label: string;
  isActive: boolean;
}

export interface ProgressBarProps {}

export default function ProgressBar(props: ProgressBarProps): ReactElement {
  const { activeStep } = useShippingContext();

  const Step = ({ label, isActive }: StepProps): ReactElement => (
    <h4
      suppressHydrationWarning
      className={`mb-0 py-2 px-5 sm:py-3 sm:px-6 md:py-4 md:px-7 sm-text rounded-lg font-medium transition ${
        isActive
          ? "bg-primary/70 text-primary-foreground"
          : "bg-background text-foreground"
      }`}
    >
      {label}
    </h4>
  );

  return (
    <section className="pt-navbar">
      <div className="container flex flex-col">
        <div className="flex mt-navbar gap-3 sm:gap-4 md:gap-5 place-self-center">
          <Step
            label="Pengiriman"
            isActive={activeStep === 1 || activeStep === 2 || activeStep === 3}
          />
          <Step
            label="Konfirmasi"
            isActive={activeStep === 2 || activeStep === 3}
          />
          <Step label="Pembayaran" isActive={activeStep === 3} />
        </div>
      </div>
    </section>
  );
}
