import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { addUserSchema } from "@/schemas/AddUserSchema";

export default function useSignUp() {
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

  return {
    form,
    addUserSchema,
    formData,
    imageFile,
    imageSrc,
    isLoading,
    setIsLoading,
    handleImageChange,
  };
}
