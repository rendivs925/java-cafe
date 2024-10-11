import { toast } from "@/hooks/use-toast";

export const handleError = (errorMessage: string) => {
  toast({ description: errorMessage, variant: "destructive" });
};
