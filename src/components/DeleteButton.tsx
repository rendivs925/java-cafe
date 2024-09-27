"use client"; // Ensures this component runs on the client side

import { type ReactElement } from "react";
import { Button } from "./ui/button"; // Importing the Button component
import { RiDeleteBin6Line } from "react-icons/ri"; // Icon for delete action
import { useToast } from "./ui/use-toast"; // Hook for displaying toast notifications

export interface DeleteButtonProps {
  itemId: string | number; // ID of the item to delete
  filePath: string; // Path of the associated file to delete
  action: (
    id: string | number,
    path: string,
  ) => Promise<{ status: string; message: string }>; // Function to call for delete action
}

export default function DeleteButton({
  itemId, // ID of the item to delete
  filePath, // File path associated with the item
  action, // Action function to handle deletion
}: DeleteButtonProps): ReactElement {
  const { toast } = useToast(); // Initialize the toast for notifications

  const handleDelete = async () => {
    try {
      const response = await action(itemId, filePath); // Call the passed action function
      if (response.status === "error") {
        return toast({
          description: response.message,
          variant: "destructive", // Toast style for error
        });
      }
      toast({ description: response.message }); // Display success message
    } catch (error) {
      // Handle unexpected errors
      toast({
        description:
          (error as { message: string }).message ||
          "An unexpected error occurred",
        variant: "destructive", // Toast style for error
      });
    }
  };

  return (
    <Button
      onClick={handleDelete} // Trigger delete on click
      size="sm" // Small button size
      variant="ghost" // Ghost button style
      className="bg-transparent" // Additional styling
    >
      <RiDeleteBin6Line className="text-destructive text-lg" />{" "}
      {/* Delete icon */}
    </Button>
  );
}
