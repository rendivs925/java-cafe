import { ShippingContext } from "@/providers/ShippingProvider";
import { ShippingContextType } from "@/types";
import { useContextSelector } from "use-context-selector";

export default function useShippingContext(): ShippingContextType {
  const context = useContextSelector(ShippingContext, (state) => state);
  return context;
}
