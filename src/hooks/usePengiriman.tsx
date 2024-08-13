import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDeferredValue, useEffect } from "react";
import useShippingContext from "./useShippingContext";
import {
  DetailPengirimanSchema,
  DetailPengirimanType,
} from "@/schemas/DetailPengirimanSchema";
import { toast } from "@/components/ui/use-toast";
import WorkerBuilder from "@/worker/workerBuilder";
import getDetailPengirimanWorker from "@/worker/getDetailPengirimanWorker";
import saveUserDetailWorker from "@/worker/saveUserDetailWorker";
import { ZodIssueBase } from "zod";
import { BASE_URL } from "@/constanst";

export default function usePengiriman() {
  const { incrementStep } = useShippingContext();

  const form = useForm<DetailPengirimanType>({
    resolver: zodResolver(DetailPengirimanSchema),
    defaultValues: {
      alamatLengkap: "",
      noHandphone: "",
    },
  });

  const formData = useDeferredValue(form.watch());

  const getPrevUserDetail = async () => {
    try {
      const worker = WorkerBuilder(getDetailPengirimanWorker);

      worker.postMessage({ BASE_URL });

      worker.onmessage = (event) => {
        const { success, result: response, error } = event.data;
        if (success) {
          if (response.detailPengiriman) {
            form.setValue(
              "alamatLengkap",
              response.detailPengiriman.alamatLengkap
            );
            form.setValue("noHandphone", response.detailPengiriman.noHandphone);
          }
        } else {
          console.error("Failed to get detail pengiriman:", error);
        }
      };

      worker.onerror = (error) => {
        console.error("Worker error:", error.message);
      };
    } catch (error) {
      console.error("Failed to fetch previous user details:", error);
      toast({
        description: "Failed to fetch previous user details.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getPrevUserDetail();
  }, []);

  useEffect(() => {
    const result = DetailPengirimanSchema.safeParse(formData);

    form.clearErrors();

    if (
      (!result.success && formData.alamatLengkap) ||
      (!result.success && formData.noHandphone)
    ) {
      result.error.issues.forEach((issue: ZodIssueBase) => {
        const path = issue.path[0] as keyof DetailPengirimanType;
        form.setError(path, { message: issue.message });
      });
    }
  }, [formData.alamatLengkap, formData.noHandphone]);

  // Function to handle form action
  const handleFormAction = async () => {
    const result = DetailPengirimanSchema.safeParse(formData);
    console.log(result.data);

    if (!result.success) {
      result.error.issues.forEach((issue: ZodIssueBase) => {
        const path = issue.path[0] as keyof DetailPengirimanType;
        form.setError(path, { message: issue.message });
      });
      return;
    }

    try {
      incrementStep();

      const worker = WorkerBuilder(saveUserDetailWorker);

      worker.postMessage({ userDetail: result.data, BASE_URL });

      worker.onmessage = (event) => {
        const { success, result: response, status, error } = event.data;
        if (success) {
          if (response.issues && response.status === "error") {
            response.issues.forEach((issue: ZodIssueBase) => {
              const path = issue.path[0] as keyof DetailPengirimanType;
              form.setError(path, { message: issue.message });
            });
            return;
          }

          if (status !== 201) {
            return toast({
              description: response.message,
              variant: "destructive",
            });
          }

          toast({ description: response.message });
        } else {
          console.error("Failed to update user details:", error);
          toast({
            description: "Failed to update user details.",
            variant: "destructive",
          });
        }
      };

      worker.onerror = (error) => {
        console.error("Worker error:", error.message);
        toast({
          description: "Worker error occurred.",
          variant: "destructive",
        });
      };
    } catch (error) {
      console.error("Error in handleFormAction:", error);
      toast({
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return { form, handleFormAction };
}
