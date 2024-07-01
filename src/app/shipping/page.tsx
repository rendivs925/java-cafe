"use client";

import useShipping from "@/hooks/useShipping";
import { type ReactElement } from "react";

export default function Shipping(): ReactElement {
  const renderContent = useShipping();

  return <section>{renderContent()}</section>;
}
