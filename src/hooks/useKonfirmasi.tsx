import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

// Define the validation schema using zod
const FormSchema = z.object({
  provinsi: z.string({
    required_error: "Provinsi is required.",
  }),
  kota: z.string({
    required_error: "Kota is required.",
  }),
  kurir: z.string({
    required_error: "Kurir is required.",
  }),
  layanan: z.string().min(1, "Please select a service."),
});

function useKonfirmasi() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      provinsi: "",
      kota: "",
      kurir: "",
      layanan: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return { form, onSubmit, FormSchema };
}

export default useKonfirmasi;
