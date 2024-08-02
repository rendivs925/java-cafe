"use client";
import { type ReactElement } from "react";
import { Button } from "./ui/button";
import useAppContext from "@/hooks/useAppContext";

export default function AddUserButton(): ReactElement {
  const { moveRoute } = useAppContext();
  return (
    <Button size="lg" onClick={() => moveRoute("/admin/users/add")}>
      Add New User
    </Button>
  );
}
