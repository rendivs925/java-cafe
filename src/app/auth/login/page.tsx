"use client";
import { type ReactElement } from "react";
import CardContainer from "@/components/CardContainer";
import InputFormField from "@/components/InputFormField";
import useLogin from "@/hooks/useLogin";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const formFields = [
  {
    name: "email",
    id: "email",
    placeholder: "example@gmail.com",
    label: "Email",
  },
  {
    name: "password",
    id: "password",
    placeholder: "Masukkan password anda",
    label: "Password",
    type: "password",
  },
];

export default function Login(): ReactElement {
  const { form, onSubmit } = useLogin();

  return (
    <CardContainer className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[400px] w-full">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Let&apos;s login to your account..</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {formFields.map((field) => (
              <InputFormField
                key={field.name}
                control={form.control}
                name={field.name}
                id={field.id}
                placeholder={field.placeholder}
                label={field.label}
                errors={form.formState.errors}
                type={field.type}
              />
            ))}
            <Button type="submit" size="default" className="w-full">
              Login Now
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <CardDescription className="mt-0">
          Don&apos;t have an account ?{" "}
          <Link href="/auth/sign-up" className="text-sm text-foreground/85">
            Sign Up
          </Link>
        </CardDescription>
      </CardFooter>
    </CardContainer>
  );
}
