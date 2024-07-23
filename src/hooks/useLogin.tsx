"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { baseUserSchema } from "@/schemas/UserSchema";

export default function useLogin() {
  const form = useForm<z.infer<typeof baseUserSchema>>({
    resolver: zodResolver(baseUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return { form, baseUserSchema };
}
