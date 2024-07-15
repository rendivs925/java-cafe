"use client";
import { type ReactElement } from "react";
import FormContainer from "@/components/FormContainer";
import InputFormField from "@/components/InputFormField";
import useSignUp from "@/hooks/useSignUp";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";

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
];

export default function SignUp(props: SignUpProps): ReactElement {
  const { form, onSubmit } = useSignUp();

  return (
    <FormContainer className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[700px] w-full">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
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
            />
          ))}
          <Button type="submit" size="default">
            Konfirmasi Pesanan
          </Button>
        </form>
      </Form>
    </FormContainer>
  );
}
