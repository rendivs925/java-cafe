import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the schema
const formSchema = z.object({
  username: z.string().min(5, {
    message: "Alamat lengkap minimal 5 karakter.",
  }),
  email: z
    .string()
    .regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, {
      message: "Format nomor tidak valid.",
    })
    .min(10, {
      message: "Nomor handphone minimal 10 digit.",
    }),
});

export default function useSignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return { form, onSubmit, formSchema };
}
