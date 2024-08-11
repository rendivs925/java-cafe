import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDeferredValue, useEffect } from "react";
import useShippingContext from "./useShippingContext";
import {
  DetailPengirimanSchema,
  DetailPengirimanType,
} from "@/schemas/DetailPengirimanSchema";

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

  // Function to handle form submission
  function onSubmit(values: DetailPengirimanType) {
    console.log("Form Submitted:", values);
    incrementStep();
  }

  // Effect to handle validation and set errors
  useEffect(() => {
    const result = DetailPengirimanSchema.safeParse(formData);

    form.clearErrors();

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof DetailPengirimanType;
        form.setError(path, { message: issue.message });
      });
    }
  }, [formData.alamatLengkap, formData.noHandphone]);

  // Function to handle form action
  const handleFormAction = async () => {
    const result = DetailPengirimanSchema.safeParse(formData);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof DetailPengirimanType;
        form.setError(path, { message: issue.message });
      });
    }

    console.log(result.data);
  };

  return { form, handleFormAction, onSubmit };
}
