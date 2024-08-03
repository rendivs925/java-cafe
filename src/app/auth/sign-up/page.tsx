"use client";
import { type ReactElement } from "react";
import CardContainer from "@/components/CardContainer";
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
import LoadingButton from "@/components/LoadingButton";
import { addUserAction } from "@/actions/addUserAction";

export default function SignUp(): ReactElement {
  const {
    form,
    formData,
    handleImageChange,
    setIsLoading,
    onSubmit,
    isLoading,
    imageFile,
    imageSrc,
  } = useSignUp();
  const { email, password, username, profileImage, role } = formData;

  const formFields = [
    {
      name: "profileImage",
      id: "productImage",
      placeholder: "Enter profile image",
      label: "Profile image",
      type: "file",
      onChange: handleImageChange,
    },
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

  return (
    <CardContainer className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[400px] w-full">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Let&apos;s register your account..</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            action={async () => {
              try {
                setIsLoading(true);
                const formData = new FormData();
                formData.append("profileImage", imageFile as File);
                formData.append("username", username);
                formData.append("email", email);
                formData.append("role", role);
                formData.append("password", password);

                const response = await addUserAction(formData);

                console.log(response.message);
              } catch (error) {
              } finally {
                setIsLoading(false);
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
                onChange={field.onChange}
                imageSrc={imageSrc as string}
              />
            ))}
            {isLoading ? (
              <LoadingButton>Mengirim...</LoadingButton>
            ) : (
              <Button type="submit" size="default" className="w-full">
                Sign Up Now
              </Button>
            )}
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
    </CardContainer>
  );
}
