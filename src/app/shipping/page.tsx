"use client";

import useClientComponent from "@/hooks/useClientComponent";
import useShipping from "@/hooks/useShipping";
import { type ReactElement } from "react";

export default function Shipping(): ReactElement {
  const renderContent = useShipping();
  const isClient = useClientComponent();

  return <section>{isClient && renderContent()}</section>;
}
