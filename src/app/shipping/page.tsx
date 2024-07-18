"use client";

import useAppContext from "@/hooks/useAppContext";
import useClientComponent from "@/hooks/useClientComponent";
import useShipping from "@/hooks/useShipping";
import { useRouter } from "next/navigation";
import { type ReactElement } from "react";

export default function Shipping(): ReactElement | null {
  const renderContent = useShipping();
  const isClient = useClientComponent();
  const { cartProductList } = useAppContext();
  const { back } = useRouter();

  if (cartProductList.length === 0 && isClient) {
    back();
    return null;
  }

  return <section>{isClient && renderContent()}</section>;
}
