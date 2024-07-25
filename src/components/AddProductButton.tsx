"use client";
import { type ReactElement } from "react";
import { Button } from "./ui/button";
import useAppContext from "@/hooks/useAppContext";

export default function AddProductButton(): ReactElement {
  const { moveRoute } = useAppContext();
  return (
    <Button size="lg" onClick={() => moveRoute("/admin/products/add")}>
      Add New Product
    </Button>
  );
}
