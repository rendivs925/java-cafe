import { toast } from "@/components/ui/use-toast";

type Status = "success" | "error";

export interface Response {
  status: Status;
  message: string;
}

export const handleResponse = (response: Response) => {
  if (response.status === "error") {
    const errorMessage = response.message || "An error occurred";
    toast({ description: errorMessage, variant: "destructive" });
    return;
  }

  toast({ description: response.message, variant: "destructive" });
};
