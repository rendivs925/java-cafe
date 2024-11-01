"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import useAppContext from "./useAppContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { addUserSchema } from "@/schemas/AddUserSchema";
import { getFile, uploadFile } from "@/lib/storage";

// Type for the error response data
interface ErrorResponse {
  message?: string;
  path?: string;
}

export default function useAddUser() {
  const { pushRoute: moveRoute } = useAppContext();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const form = useForm<z.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "user",
      profileImage: undefined,
    },
  });

  const formData = form.watch();

  const handleCancel = () => {
    form.reset();
    setImageSrc("https://github.com/shadcn.png");
    moveRoute("/admin/users");
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
    const folder = "users/";
    const imagePath = await uploadFile(file, folder);
    const imageUrl = await getFile(imagePath);

    return imageUrl;
  };

  async function onSubmit({
    email,
    username,
    password,
  }: z.infer<typeof addUserSchema>) {
    const payload = {
      username,
      email,
      password,
    };

    try {
      setIsLoading(true);
      await axios.post("/api/auth/sign-up", payload);

      toast({
        title: "Signed up successfully.",
        description: "Time to login to your account..",
      });

      moveRoute("/auth/login");
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

        // Set form error if path is provided
        if (path === "email" || path === "username" || path === "password") {
          form.setError(path, {
            message: errorMessage,
          });
        }
      }
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
    setIsLoading,
    isLoading,
    handleImageChange,
    formData,
    handleCancel,
    handleUpload,
  };
}
