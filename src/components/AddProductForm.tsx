"use client";
import { type ReactElement } from "react";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import InputFormField from "./InputFormField";
import useAddProduct from "@/hooks/useAddProduct";
import { Form } from "./ui/form";
import CardContainer from "./CardContainer";
import { CardContent } from "./ui/card";
import ImagePreview from "./ImagePreview";

interface FormField {
  name: string;
  id: string;
  placeholder: string;
  label: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: File | undefined;
}

export default function AddProductForm(): ReactElement {
  const { form, handleImageChange, imageFile, imageSrc, isLoading, onSubmit } =
    useAddProduct();
  const formFields: FormField[] = [
    {
      name: "title",
      id: "title",
      placeholder: "Enter product title",
      label: "Title",
    },
    {
      name: "price",
      id: "price",
      placeholder: "Enter product price",
      label: "Price",
      type: "number",
    },
    {
      name: "description",
      id: "description",
      placeholder: "Enter product description",
      label: "Description",
      type: "text",
    },
    {
      name: "category",
      id: "category",
      placeholder: "Enter product category",
      label: "Category",
    },
    {
      name: "stock",
      id: "stock",
      placeholder: "Enter stock quantity",
      label: "Stock",
      type: "number",
    },
    {
      name: "productImage",
      id: "productImage",
      placeholder: "Enter product image",
      label: "Product image",
      type: "file",
      onChange: handleImageChange,
    },
  ];

  return (
    <>
      <CardContainer>
        <CardContent className="pt-6">
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
                  onChange={field.onChange}
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
      </CardContainer>
      <ImagePreview imageSrc={imageSrc} />
    </>
  );
}
