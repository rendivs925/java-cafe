"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import useAppContext from "./useAppContext";
import { User } from "@/types";
import { useState } from "react";

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
  const { moveRoute, setUser } = useAppContext();
  const [isLoading, setIsloading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({ email, password }: z.infer<typeof formSchema>) {
    const payload = {
      email,
      password,
    };

    try {
      setIsloading(true);
      const { data } = await axios.post("/api/auth/login", payload);
      console.log("Data:", data);
      const user: User = {
        username: data.username,
        email: data.email,
        role: data.role,
      };

      setUser(user);
      moveRoute("/");
    } catch (e) {
      const error = e as AxiosError;

      console.log("Error:", error);
    } finally {
      setIsloading(false);
    }
  }

  return { form, onSubmit, formSchema, isLoading };
}
