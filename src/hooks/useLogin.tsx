"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { baseUserSchema } from "@/schemas/UserSchema";

export default function useLogin() {
  const [isLoading, setIsloading] = useState(false);
  const form = useForm<z.infer<typeof baseUserSchema>>({
    resolver: zodResolver(baseUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formData = form.watch();

  return { form, setIsloading, formData, baseUserSchema, isLoading };
}
