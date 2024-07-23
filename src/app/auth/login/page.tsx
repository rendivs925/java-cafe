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
import { ZodError } from "zod";
import Link from "next/link";
import LoadingButton from "@/components/LoadingButton";
import InputFormField from "@/components/InputFormField";
import loginAction from "@/actions/loginAction";
import useAppContext from "@/hooks/useAppContext";

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

interface LoginData {
  email: string;
  password: string;
}

export default function Login(): ReactElement {
  const { form, baseUserSchema } = useLogin();
  const { moveRoute } = useAppContext();

  const handleSubmit = async (formData: FormData) => {
    const loginData: LoginData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    form.clearErrors();

    try {
      baseUserSchema.parse(loginData);

      const data = await loginAction(formData);

      if (data?.errors) {
        const zodErrors = (data.errors as []).map(
          (issue: { path: string[]; message: string }) => ({
            path: issue.path,
            message: issue.message,
          })
        );

        form.setError("email", {
          message:
            zodErrors.find((err) => err.path[0] === "email")?.message || "",
        });
        form.setError("password", {
          message:
            zodErrors.find((err) => err.path[0] === "password")?.message || "",
        });
      } else {
        moveRoute("/");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const zodErrors = error.issues.map((issue) => ({
          path: issue.path,
          message: issue.message,
        }));

        form.setError("email", {
          message:
            zodErrors.find((err) => err.path[0] === "email")?.message || "",
        });
        form.setError("password", {
          message:
            zodErrors.find((err) => err.path[0] === "password")?.message || "",
        });
      }
    }
  };

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
          <form action={handleSubmit} className="space-y-5">
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
            {/* {isLoading ? ( */}
            {/*   <LoadingButton>Mengirim...</LoadingButton> */}
            {/* ) : ( */}
            {/*   <Button type="submit" size="default" className="w-full"> */}
            {/*     Login Now */}
            {/*   </Button> */}
            {/* )} */}
            <Button type="submit" size="default" className="w-full">
              Login Now
            </Button>
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
