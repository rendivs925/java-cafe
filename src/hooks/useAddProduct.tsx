"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import useAppContext from "./useAppContext";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  addProductSchema,
  AddProductType,
  newAddProductType,
} from "@/schemas/AddProductSchema";
import { getFile, uploadFile } from "@/lib/storage";
import { useRouter } from "next/navigation";

// Type for the error response data
interface ErrorResponse {
  message?: string;
  path?: string;
}

export default function useAddProduct() {
  const { moveRoute } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: "Your product title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis ut, fugit perferendis",
      price: 1000,
      category: "espresso",
      stock: 0,
      productImage: undefined,
    },
  });

  const formData = form.watch();

  const handleCancel = () => {
    form.reset();
    setImageSrc("https://via.placeholder.com/400");
    moveRoute("/admin/products");
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (file: File) => {
    const folder = "products/";
    const imagePath = await uploadFile(file, folder);
    const imageUrl = await getFile(imagePath);

    return imageUrl;
  };

  async function onSubmit(formData: AddProductType) {
    setIsLoading(true);

    try {
      // Check if product already exists
      const checkResponse = await axios.post("/api/products/check-product", {
        title: formData.title, // Assuming 'title' is the unique identifier
      });

      if (checkResponse.data.exists) {
        toast({
          description: "Product already exists",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      toast({ description: "Product added successfully.", variant: "success" });
      setIsLoading(false);

      form.reset();
      setImageSrc("https://via.placeholder.com/400");

      const imgUrl = await handleUpload(imageFile as File);

      const { productImage, ...payload } = formData;

      (payload as newAddProductType).imgUrl = imgUrl;

      form.clearErrors();

      await axios.post("/api/products/add-product", payload);
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 400) {
        // Type assertion to ensure `axiosError.response.data` is of type `ErrorResponse`
        const errorData = axiosError.response?.data as ErrorResponse;

        // Default error message if not provided
        const errorMessage = errorData.message;

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

      toast({ description: "Something went wrong.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    form,
    setImageSrc,
    imageSrc,
    imageFile,
    onSubmit,
    isLoading,
    handleImageChange,
    formData,
    handleCancel,
  };
}
