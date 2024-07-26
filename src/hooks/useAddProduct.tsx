"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import useAppContext from "./useAppContext";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { addProductSchema } from "@/schemas/AddProductSchema";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../lib/firebase";

// Type for the error response data
interface ErrorResponse {
  message?: string;
  path?: string;
}

export default function useAddProduct() {
  // const { moveRoute } = useAppContext();
  const [isLoading, setIsloading] = useState(false);
  const [progresspercent, setProgresspercent] = useState(0);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
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

  const formData = form.watch();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadFile = async (file: File) => {
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      async () => {
        return await getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL) => {
            return downloadURL as string;
          }
        );
      }
    );
  };

  async function onSubmit(formData: z.infer<typeof addProductSchema>) {
    const payload = {
      ...formData,
    };

    const url = await uploadFile(imageFile as File);

    console.log(url);

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
    imageSrc,
    onSubmit,
    isLoading,
    handleImageChange,
    formData,
  };
}
