import { z } from "zod";
import { useForm, } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useShippingContext from "./useShippingContext";

// Define the schema
const formSchema = z.object({
  alamatLengkap: z.string().min(5, {
    message: "Alamat lengkap minimal 5 karakter.",
  }),
  noHandphone: z
    .string()
    .regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, {
      message: "Format nomor tidak valid.",
    })
    .min(10, {
      message: "Nomor handphone minimal 10 digit.",
    }),
});

export default function usePengiriman() {
  const { incrementStep } = useShippingContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      alamatLengkap: "",
      noHandphone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    incrementStep();
  }

  return { form, onSubmit, formSchema};
}
