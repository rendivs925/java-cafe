"use client";
import { useEffect, type ReactElement } from "react";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import InputFormField from "./InputFormField";
import useAddProduct from "@/hooks/useAddProduct";
import { Form } from "./ui/form";
import CardContainer from "./CardContainer";
import { CardContent } from "./ui/card";
import ImagePreview from "./ImagePreview";
import SelectFormField, { Option } from "./SelectFormField";

interface FormField {
  name: string;
  id: string;
  placeholder: string;
  label: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: File | undefined;
  options?: Option[];
}

export default function AddProductForm(): ReactElement {
  const { form, formData, handleImageChange, imageSrc, isLoading, onSubmit } =
    useAddProduct();
  const { title, category, description, price, stock, productImage } = formData;

  useEffect(() => {
    console.log(imageSrc);
  }, [imageSrc]);

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
    },
    {
      name: "category",
      id: "category",
      placeholder: "Enter product category",
      label: "Category",
      options: [
        { value: "espresso", label: "Espresso" },
        { value: "cappuccino", label: "Cappuccino" },
        { value: "latte", label: "Latte" },
        { value: "americano", label: "Americano" },
      ],
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
              {formFields.map((field, index) =>
                field.name === "category" ? (
                  <SelectFormField
                    label={field.label}
                    name={field.name}
                    control={form.control}
                    options={field.options as Option[]}
                  />
                ) : (
                  <InputFormField
                    control={form.control}
                    name={field.name}
                    id={field.id + index}
                    placeholder={field.placeholder}
                    label={field.label}
                    errors={form.formState.errors}
                    type={field.type}
                    onChange={field.onChange}
                  />
                )
              )}
              <div className="flex gap-6">
                {isLoading ? (
                  <LoadingButton>Mengirim...</LoadingButton>
                ) : (
                  <>
                    <Button
                      type="submit"
                      size="default"
                      variant="outline"
                      className="w-full"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" size="default" className="w-full">
                      Add Product
                    </Button>
                  </>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </CardContainer>
      <ImagePreview
        imgUrl={imageSrc as string}
        category={category}
        description={description}
        id={price}
        price={price}
        stock={stock}
        title={title}
      />
    </>
  );
}
