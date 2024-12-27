"use client";
import useAppContext from "@/hooks/useAppContext";
import { useTransition } from "react";
import CardContainer from "@/components/CardContainer";
import InputFormField from "@/components/InputFormField";
import useSignUp from "@/hooks/useSignUp";
import { FormProvider } from "react-hook-form";
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
import { addUserAction } from "@/actions/addUserAction";
import { toast } from "@/hooks/use-toast";

export default function SignUp() {
  const { form, formData, handleImageChange, imageFile, imageSrc } =
    useSignUp();
  let [isLoading, startTransition] = useTransition();
  const { pushRoute } = useAppContext();

  const { username, email, password, role } = formData;

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
      placeholder: "Enter your password",
      label: "Password",
      type: "password",
    },
  ];

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("role", role);
      formData.append("password", password);

      const response = await addUserAction(formData);

      if (response.status !== "success") {
        toast({
          description: response.message,
        });
        return;
      }

      toast({
        description: "Sign Up successfully.",
      });

      pushRoute("/auth/login");
    } catch (error) {
      toast({
        description:
          "An unexpected error occurred during sign-up. Please try again.",
      });
    }
  };

  return (
    <CardContainer className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[400px] sm:shadow w-full">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Let&apos;s register your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form
            action={() => {
              startTransition(() => {
                handleSubmit();
              });
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
              <LoadingButton>Submitting...</LoadingButton>
            ) : (
              <Button
                type="submit"
                size="default"
                className="w-full"
              >
                Sign Up Now
              </Button>
            )}
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter>
        <CardDescription className="mt-0">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-sm text-foreground/85">
            Login
          </Link>
        </CardDescription>
      </CardFooter>
    </CardContainer>
  );
}
