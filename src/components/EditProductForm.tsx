"use client";

import { type ReactElement, useState } from "react";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import InputFormField from "./InputFormField";
import { toast } from "@/hooks/use-toast";
import useEditProduct from "@/hooks/useEditProduct";
import { Form } from "./ui/form";
import CardContainer from "./CardContainer";
import { CardContent } from "./ui/card";
import ImagePreview from "./ImagePreview";
import SelectFormField from "./SelectFormField";
import { editProductAction } from "@/actions/editProductAction";
import { Option } from "./PengirimanForm";
import { newAddProductType } from "@/schemas/AddProductSchema";

export interface FormField {
  name: string;
  id: string;
  placeholder: string;
  label: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: File | undefined;
  options?: Option[];
}

interface EditProductFormProps {
  product: newAddProductType;
}

export default function EditProductForm({
  product,
}: EditProductFormProps): ReactElement {
  const {
    form,
    handleCancel,
    formData,
    handleImageChange,
    imageFile,
    isLoading,
    startTransition,
  } = useEditProduct({ product });

  const [currentImage, setCurrentImage] = useState<string | ArrayBuffer | null>(
    product?.imgUrl || null,
  );

  const { title, capital, weight, category, description, price, stock } =
    formData;

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
      name: "capital",
      id: "capital",
      placeholder: "Enter capital amount",
      label: "Capital",
      type: "number",
    },
    {
      name: "weight",
      id: "weight",
      placeholder: "Enter weight (g)",
      label: "Weight",
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
        { value: "coffee", label: "Coffee" },
        { value: "cookie", label: "Cookie" },
        { value: "tea", label: "Tea" },
        { value: "pastry", label: "Pastry" },
        { value: "snack", label: "Snack" },
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
      label: "Product Image",
      type: "file",
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        handleImageChange(event);
        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          reader.onload = () => {
            setCurrentImage(reader.result);
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      },
    },
  ];

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", String(price));
      formData.append("capital", String(capital));
      formData.append("weight", String(weight));
      formData.append("description", description);
      formData.append("category", category);
      formData.append("stock", String(stock));
      if (imageFile) {
        formData.append("productImage", imageFile as File);
      }

      const response = await editProductAction(
        formData,
        product?._id as string,
      );
      if (
        response.status === "error" &&
        "errors" in response &&
        response.errors
      ) {
        response.errors.forEach((error) =>
          form.setError(error.path[0] as "title" | "price" | "capital", {
            type: "manual",
            message: error.message,
          }),
        );
        toast({ description: response.message, variant: "destructive" });
        return;
      }

      if (response.status === "error") {
        toast({ description: response.message, variant: "destructive" });
        return;
      }

      toast({ description: response.message });
    } catch (err) {
      toast({
        description: "An error occurred while updating the product.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <CardContainer className="bg-background">
        <CardContent className="pt-6">
          <Form {...form}>
            <form
              action={() => {
                startTransition(() => {
                  handleSubmit();
                });
              }}
              className="space-y-5"
            >
              {formFields.map((field) =>
                field.name === "category" ? (
                  <SelectFormField
                    key={field.id}
                    label={field.label}
                    name={field.name}
                    control={form.control}
                    options={field.options as Option[]}
                  />
                ) : (
                  <InputFormField
                    key={field.id}
                    control={form.control}
                    name={field.name}
                    id={field.id}
                    placeholder={field.placeholder}
                    label={field.label}
                    errors={form.formState.errors}
                    type={field.type}
                    onChange={field.onChange}
                  />
                ),
              )}
              <div className="flex gap-6">
                <Button
                  type="button"
                  size="default"
                  variant="outline"
                  className="w-full"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                {isLoading ? (
                  <LoadingButton>Updating...</LoadingButton>
                ) : (
                  <Button type="submit" size="default" className="w-full">
                    Update Product
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </CardContainer>
      <ImagePreview
        imgUrl={
          currentImage ? (currentImage as string) : (product?.imgUrl as string)
        }
        key={title}
        category={category}
        description={description}
        productId={product?._id?.toString() as string}
        price={price}
        stock={stock}
        title={title}
      />
    </>
  );
}
