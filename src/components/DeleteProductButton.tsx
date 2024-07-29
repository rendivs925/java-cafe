"use client";
import { type ReactElement } from "react";
import { Button } from "./ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteProductAction } from "@/actions/deleteProductAction";
import { useToast } from "./ui/use-toast";

export interface DeleteProductButtonProps {
  productId: string | number;
  filePath: string;
}

export default function DeleteProductButton({
  productId,
  filePath,
}: DeleteProductButtonProps): ReactElement {
  const { toast } = useToast();
  const handleDeleteProduct = async (productId: number | string) => {
    try {
      const response = await deleteProductAction(productId, filePath);
      if (response.status === "error")
        return toast({
          description: response.message as string,
          variant: "destructive",
        });
      toast({ description: response.message as string, variant: "success" });
    } catch (error) {
      toast({
        description: (error as { message: string }).message,
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={() => {
        handleDeleteProduct(productId);
      }}
      size="sm"
      variant="ghost"
      className="bg-transparent"
    >
      <RiDeleteBin6Line className="text-destructive text-lg" />
    </Button>
  );
}
