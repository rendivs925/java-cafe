import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import useAppContext from "./useAppContext";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { signUpSchema } from "@/schemas/UserSchema";

// Type for the error response data
interface ErrorResponse {
  message?: string;
  path?: string;
}

export default function useSignUp() {
  const { moveRoute } = useAppContext();
  const { toast } = useToast();
  const [isLoading, setIsloading] = useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
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
  }: z.infer<typeof signUpSchema>) {
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
    } catch (error) {
      const axiosError = error as AxiosError;

      // Handle 401 (Unauthorized) errors specifically
      if (axiosError.response?.status === 401) {
        // Type assertion to ensure `axiosError.response.data` is of type `ErrorResponse`
        const errorData = axiosError.response?.data as ErrorResponse;

        // Default error message if not provided
        const errorMessage = errorData.message || "Unauthorized";

        // Use optional chaining to safely get the path
        const path = errorData.path || ""; // Default to empty string if path is undefined

        // Set form error if path is provided
        if (path === "email" || path === "username" || path === "password") {
          form.setError(path, {
            message: errorMessage,
          });
        }
      }
    } finally {
      setIsloading(false);
    }
  }

  return { form, onSubmit, signUpSchema, isLoading };
}
