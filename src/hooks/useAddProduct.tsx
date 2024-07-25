"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import useAppContext from "./useAppContext";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { addProductSchema } from "@/schemas/AddProductSchema";

// Type for the error response data
interface ErrorResponse {
  message?: string;
  path?: string;
}

export default function useAddProduct() {
  const { moveRoute } = useAppContext();
  const [isLoading, setIsloading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      productImage: undefined,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);

        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(formData: z.infer<typeof addProductSchema>) {
    const payload = {
      ...formData,
    };

    form.clearErrors();

    try {
      setIsloading(true);
      const { data } = await axios.post("/api/auth/login", payload);

      const productToAdd: z.infer<typeof addProductSchema> = {
        ...data,
      };

      toast({ description: "Product added successfully.", variant: "success" });
    } catch (error) {
      const axiosError = error as AxiosError;

      // Handle 401 (Unauthorized) errors specifically
      if (axiosError.response?.status === 401) {
        // Type assertion to ensure `axiosError.response.data` is of type `ErrorResponse`
        const errorData = axiosError.response?.data as ErrorResponse;

        // Default error message if not provided
        const errorMessage = errorData.message || "Unauthorized";

        // Use optional chaining to safely get the path
        const path = errorData.path || ""; // Default to empty string if path is undefined

        type ErrorPath =
          | "title"
          | "description"
          | "stock"
          | "price"
          | "category"
          | "productImage"
          | "root"
          | `root.${string}`;

        const errorPaths: ErrorPath[] = [
          "title",
          "category",
          "stock",
          "productImage",
          "description",
          "price",
        ];

        // Set form error if path is provided
        errorPaths.forEach((errorPath) => {
          if (path === errorPath) {
            form.setError(path, {
              message: errorMessage,
            });
          }
        });
      }
    } finally {
      setIsloading(false);
    }
  }

  return {
    form,
    setImageSrc,
    setImageFile,
    imageSrc,
    imageFile,
    onSubmit,
    isLoading,
    handleImageChange,
  };
}
