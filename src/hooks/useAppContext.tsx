"use client";

import { AppContext } from "@/providers/AppProvider";
import { useContextSelector } from "use-context-selector";

export default function useAppContext() {
  const context = useContextSelector(
    AppContext,
    (state) => state,
  );

  if (!context) return null
  return context;
}
