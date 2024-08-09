"use client";
import { ReactElement } from "react";
import CardContainer from "@/components/CardContainer";
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
import LoadingButton from "@/components/LoadingButton";
import InputFormField from "@/components/InputFormField";
import { loginAction } from "@/actions/loginAction";
import { toast } from "@/components/ui/use-toast";
import useAppContext from "@/hooks/useAppContext";
import { User } from "@/types";

interface FormField {
  name: string;
  id: string;
  placeholder: string;
  label: string;
  type?: string;
}

const formFields: FormField[] = [
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
  const { form, isLoading, formData, setIsloading } = useLogin();
  const { pushRoute, setUser, setTotalItems } = useAppContext();

  const { email, password } = formData;

  return (
    <CardContainer className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[400px] w-full shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Login</CardTitle>
        <CardDescription className="text-gray-500">
          Let&apos;s login to your account..
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            action={async () => {
              try {
                const formData = new FormData();
                formData.append("email", email);
                formData.append("password", password);

                const response = await loginAction(formData);

                console.log(response.message);
                if (response.status === "success") {
                  console.log(response.user);
                  toast({
                    description: "Logged in successfully.",
                    variant: "success",
                  });

                  setTotalItems(response.totalItems);

                  setUser(response.user as User);

                  pushRoute("/");
                }
              } catch (error) {
              } finally {
              }
            }}
            className="space-y-5"
          >
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
            {isLoading ? (
              <LoadingButton>Mengirim...</LoadingButton>
            ) : (
              <Button type="submit" size="default" className="w-full">
                Login Now
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <CardDescription className="mt-0">
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up" className="text-sm text-foreground/85">
            Sign Up
          </Link>
        </CardDescription>
      </CardFooter>
    </CardContainer>
  );
}
