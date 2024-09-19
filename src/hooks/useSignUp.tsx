import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { addUserSchema } from "@/schemas/AddUserSchema";

export default function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);

  const form = useForm<z.infer<typeof addUserSchema>>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "user",
      profileImage: null,
    },
    mode: "onChange",
  });

  const { watch, ...formMethods } = form;
  const formData = watch();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return {
    form: formMethods,
    formData,
    imageFile,
    imageSrc,
    isLoading,
    setIsLoading,
    handleImageChange,
  };
}
