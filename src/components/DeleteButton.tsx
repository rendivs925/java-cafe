"use client";

import { type ReactElement } from "react";
import { Button } from "./ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useToast } from "@/hooks/use-toast";

export interface DeleteButtonProps {
  itemId: string | number;
  filePath: string;
  action: (
    id: string | number,
    path: string,
  ) => Promise<{ status: string; message: string }>;
}

export default function DeleteButton({
  itemId,
  filePath,
  action,
}: DeleteButtonProps): ReactElement {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const response = await action(itemId, filePath);
      if (response.status === "error") {
        return toast({
          description: response.message,
          variant: "destructive",
        });
      }
      toast({ description: response.message });
    } catch (error) {
      toast({
        description:
          (error as { message: string }).message ||
          "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleDelete}
      size="sm"
      variant="ghost"
      className="bg-transparent"
    >
      <RiDeleteBin6Line className="text-destructive text-lg" />{" "}
      {/* Delete icon */}
    </Button>
  );
}
