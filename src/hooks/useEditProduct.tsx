"use client";
import React, { useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAppContext from "./useAppContext";
import { useState, useEffect } from "react";
import { addProductSchema, AddProductType } from "@/schemas/AddProductSchema";

interface UseEditProductProps {
  product: AddProductType;
}

export default function useEditProduct({ product }: UseEditProductProps) {
  const { pushRoute: moveRoute } = useAppContext();
  const [isLoading, startTransition] = useTransition();
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(
    product?.productImage || null,
  );

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: product?.title || "",
      description: product?.description || "",
      price: product?.price || 0,
      category: product?.category || "",
      stock: product?.stock || 0,
      capital: product?.capital || 0,
      weight: product?.weight || 0,
      productImage: undefined,
    },
    mode: "onChange",
  });

  const formData = form.watch();

  useEffect(() => {
    setImageSrc(product?.productImage || "https://via.placeholder.com/400");
  }, [product]);

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

  return {
    form,
    setImageSrc,
    imageSrc,
    imageFile,
    handleImageChange,
    formData,
    handleCancel,
    isLoading,
    startTransition,
  };
}
