import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import useAppContext from "./useAppContext";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// Define the schema
const formSchema = z.object({
  username: z.string().min(5, {
    message: "Username minimal 5 karakter.",
  }),
  email: z.string().email({ message: "Format email tidak valid." }).min(5, {
    message: "Email minimal 5 karakter.",
  }),
  password: z.string().min(8, {
    message: "Password minimal 8 karakter.",
  }),
});

export default function useSignUp() {
  const { moveRoute } = useAppContext();
  const { toast } = useToast();
  const [isLoading, setIsloading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit({
    email,
    username,
    password,
  }: z.infer<typeof formSchema>) {
    const payload = {
      username,
      email,
      password,
    };

    try {
      setIsloading(true);
      await axios.post("/api/auth/sign-up", payload);

      toast({
        title: "Signed up successfully.",
        description: "Time to login to your account..",
        variant: "success",
      });

      moveRoute("/auth/login");
    } catch (e) {
      const error = e as AxiosError;

      console.log("Error:", error);
    } finally {
      setIsloading(false);
    }
  }

  return { form, onSubmit, formSchema, isLoading };
}
