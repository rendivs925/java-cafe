import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the schema
const formSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid." }).min(5, {
    message: "Email minimal 5 karakter.",
  }),
  password: z.string().min(8, {
    message: "Password minimal 8 karakter.",
  }),
});

export default function useLogin() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return { form, onSubmit, formSchema };
}
