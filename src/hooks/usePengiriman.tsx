import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDeferredValue, useEffect, useTransition } from "react";
import useShippingContext from "./useShippingContext";
import {
  DetailPengirimanSchema,
  DetailPengirimanType,
} from "@/schemas/DetailPengirimanSchema";
import { createUserDetailAction } from "@/actions/createUserDetailAction";
import { toast } from "@/components/ui/use-toast";
import { getUserDetailAction } from "@/actions/getUserDetailAction";
import useAppContext from "./useAppContext";

export default function usePengiriman() {
  const { incrementStep, activeStep } = useShippingContext();
  const { setDetailPengiriman, user } = useAppContext();
  const [isPending, startTransition] = useTransition();

  const form = useForm<DetailPengirimanType>({
    resolver: zodResolver(DetailPengirimanSchema),
    defaultValues: {
      alamatLengkap: "",
      noHandphone: "",
    },
  });

  const formData = useDeferredValue(form.watch());

  const getPrevUserDetail = async () => {
    const response = await getUserDetailAction();

    if (response.status === "success" && response.detailPengiriman) {
      form.setValue("alamatLengkap", response.detailPengiriman.alamatLengkap);
      form.setValue("noHandphone", response.detailPengiriman.noHandphone);
    }
  };

  useEffect(() => {
    getPrevUserDetail();
  }, [activeStep]);

  useEffect(() => {
    const result = DetailPengirimanSchema.safeParse(formData);

    form.clearErrors();

    if (
      (!result.success && formData.alamatLengkap) ||
      (!result.success && formData.noHandphone)
    ) {
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof DetailPengirimanType;
        form.setError(path, { message: issue.message });
      });
    }
  }, [formData]);

  // Function to handle form action
  const handleFormAction = () => {
    startTransition(async () => {
      const result = DetailPengirimanSchema.safeParse(formData);

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const path = issue.path[0] as keyof DetailPengirimanType;
          form.setError(path, { message: issue.message });
        });
        return;
      }

      setDetailPengiriman({ ...result.data, username: user.username });

      try {
        const response = await createUserDetailAction(result.data);

        if (response.issues && response.status === "error") {
          response.issues.forEach((issue) => {
            const path = issue.path[0] as keyof DetailPengirimanType;
            form.setError(path, { message: issue.message });
          });
          return;
        }

        if (response.status === "error") {
          toast({ description: response.message, variant: "destructive" });
        } else {
          toast({ description: response.message });
          incrementStep();
        }
      } catch (error) {
        console.error("Error:", error);
        toast({
          description: "An error occurred, please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return { form, handleFormAction, isPending }; // Return isPending state
}
