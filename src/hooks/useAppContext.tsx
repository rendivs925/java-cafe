"use client";

import { AppContext } from "@/providers/AppProvider";
import { AppContextType } from "@/types";
import { useContextSelector } from "use-context-selector";

export default function useAppContext(): AppContextType | null {
  const context: AppContextType | null = useContextSelector(
    AppContext,
    (state) => state
  );

  if (context === null) return null;
  return context;
}
