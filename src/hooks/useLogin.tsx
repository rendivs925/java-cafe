"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import useAppContext from "./useAppContext";
import { User } from "@/types";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { baseUserSchema } from "@/schemas/UserSchema";

// Type for the error response data
interface ErrorResponse {
  message?: string;
  path?: string;
}

export default function useLogin() {
  const { moveRoute, setUser } = useAppContext();
  const [isLoading, setIsloading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof baseUserSchema>>({
    resolver: zodResolver(baseUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({ email, password }: z.infer<typeof baseUserSchema>) {
    const payload = {
      email,
      password,
    };

    try {
      setIsloading(true);
      const { data } = await axios.post("/api/auth/login", payload);

      const user: User = {
        username: data.username,
        email: data.email,
        role: data.role,
      };

      toast({ description: "Logged in successfully.", variant: "success" });

      setUser(user);
      moveRoute("/");
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
        if (path === "email" || path === "password") {
          form.setError(path, {
            message: errorMessage,
          });
        }
      }
    } finally {
      setIsloading(false);
    }
  }

  return { form, onSubmit, baseUserSchema, isLoading };
}
