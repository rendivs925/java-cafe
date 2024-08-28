"use client";
import { type ReactElement } from "react";
import { Button } from "./ui/button";
import useAppContext from "@/hooks/useAppContext";

export default function AddButton({
  route,
  label,
}: {
  route: string;
  label: string;
}): ReactElement {
  const { pushRoute: moveRoute } = useAppContext();
  return (
    <Button size="lg" onClick={() => moveRoute(route)}>
      {label}
    </Button>
  );
}
