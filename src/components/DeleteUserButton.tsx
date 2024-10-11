"use client";
import { type ReactElement } from "react";
import { Button } from "./ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useToast } from "@/hooks/use-toast";
import { deleteUserAction } from "@/actions/deleteUserAction";

export interface DeleteUserButtonProps {
  itemId: string | number;
  filePath: string;
}

export default function DeleteUserButton({
  itemId,
  filePath,
}: DeleteUserButtonProps): ReactElement {
  const { toast } = useToast();
  const handleDeleteUser = async (itemId: number | string) => {
    try {
      const response = await deleteUserAction(itemId, filePath);
      if (response.status === "error")
        return toast({
          description: response.message as string,
          variant: "destructive",
        });
      toast({ description: response.message as string });
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
        handleDeleteUser(itemId);
      }}
      size="sm"
      variant="ghost"
      className="bg-transparent"
    >
      <RiDeleteBin6Line className="text-destructive text-lg" />
    </Button>
  );
}
