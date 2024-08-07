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
import SelectFormField, { Option } from "./SelectFormField";
import { addProductAction } from "@/actions/addProductAction";

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
  const {
    form,
    setIsLoading,
    handleCancel,
    formData,
    handleImageChange,
    imageSrc,
    isLoading,
    imageFile,
  } = useAddProduct();
  const {
    title,
    capital,
    profit,
    weight,
    category,
    description,
    price,
    stock,
  } = formData;

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
      name: "profit",
      id: "profit",
      placeholder: "Enter profit amount",
      label: "Profit",
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
      label: "Product Image",
      type: "file",
      onChange: handleImageChange,
    },
  ];

  return (
    <>
      <CardContainer>
        <CardContent className="pt-6">
          <Form {...form}>
            <form
              action={async () => {
                try {
                  setIsLoading(true);
                  const formData = new FormData();
                  formData.append("title", title);
                  formData.append("price", String(price));
                  formData.append("capital", String(capital));
                  formData.append("profit", String(profit));
                  formData.append("weight", String(weight));
                  formData.append("description", description);
                  formData.append("category", category);
                  formData.append("stock", String(stock));
                  formData.append("productImage", imageFile as File);

                  // Handle reviews as a JSON string since it's an array of objects
                  // formData.append("reviews", JSON.stringify(reviews));

                  const response = await addProductAction(formData);

                  console.log(response.message);
                } catch (error) {
                } finally {
                  setIsLoading(false);
                }
              }}
              className="space-y-5"
            >
              {formFields.map((field) =>
                field.name === "category" ? (
                  <SelectFormField
                    key={field.id + field.name}
                    label={field.label}
                    name={field.name}
                    control={form.control}
                    options={field.options as Option[]}
                  />
                ) : (
                  <InputFormField
                    key={field.id + field.name}
                    control={form.control}
                    name={field.name}
                    id={field.id}
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
                  <>
                    <Button
                      type="button"
                      size="default"
                      variant="outline"
                      className="w-full"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <LoadingButton>Menambahkan...</LoadingButton>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      size="default"
                      variant="outline"
                      className="w-full"
                      onClick={handleCancel}
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
        key={title}
        category={category}
        description={description}
        productId={title}
        price={price}
        stock={stock}
        title={title}
      />
    </>
  );
}
