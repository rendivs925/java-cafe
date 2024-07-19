"use client";
import { type ReactElement } from "react";
import { Button } from "./ui/button";
import useAppContext from "@/hooks/useAppContext";

export default function AuthNavButtons(): ReactElement {
  const { moveRoute } = useAppContext();

  return (
    <div className="flex gap-6 max-sm:hidden">
      <Button onClick={() => moveRoute("/auth/login")} size="default">
        Login
      </Button>
      <Button
        onClick={() => moveRoute("/auth/sign-up")}
        size="default"
        variant="outline"
      >
        Sign Up
      </Button>
    </div>
  );
}
