"use client";
import { type ReactElement } from "react";
import FormContainer from "@/components/FormContainer";
import InputFormField from "@/components/InputFormField";
import useSignUp from "@/hooks/useSignUp";
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

export interface SignUpProps {}

const formFields = [
  {
    name: "username",
    id: "username",
    placeholder: "Rendi Virgantara Setiawan",
    label: "Username",
  },
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

export default function SignUp(props: SignUpProps): ReactElement {
  const { form, onSubmit } = useSignUp();

  return (
    <FormContainer className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[400px] w-full">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Let's register your account..</CardDescription>
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
              Sign Up Now
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <CardDescription className="mt-0">
          Already have an account ?{" "}
          <Link href="/auth/login" className="text-sm text-foreground/85">
            Login
          </Link>
        </CardDescription>
      </CardFooter>
    </FormContainer>
  );
}
