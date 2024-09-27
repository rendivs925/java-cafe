"use client";
import { type ReactElement } from "react";
import { Button } from "./ui/button";
import useAppContext from "@/hooks/useAppContext";
import { GrView } from "react-icons/gr";

export interface ViewDetailButtonProps {
  path: string;
}

export default function ViewDetailButton({
  path,
}: ViewDetailButtonProps): ReactElement {
  const { pushRoute } = useAppContext();

  const handleView = async () => {
    pushRoute(path);
  };

  return (
    <Button
      onClick={handleView}
      size="sm"
      variant="ghost"
      className="bg-transparent"
    >
      <GrView className="text-foreground text-lg" />
    </Button>
  );
}
