"use client";

import { useRouter } from "next/navigation";
import { ReactNode, ReactElement } from "react";
import { createContext } from "use-context-selector";
import { AppContextType } from "@/types";

// Create the context with a default value
export const AppContext = createContext<AppContextType | null>(null);

export interface AppProviderProps {
  children: ReactNode;
}

export default function AppProvider({
  children,
}: AppProviderProps): ReactElement {
  const router = useRouter();

  const moveRoute = (route: string) => {
    router.push(route);
  };

  const contextValues: AppContextType = {
    moveRoute,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
}
