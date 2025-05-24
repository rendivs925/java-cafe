"use server";

import { COOKIE_NAME } from "@/constanst";
import { cookies } from "next/headers";

export async function logoutAction() {
  (await cookies()).set({
    name: COOKIE_NAME,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    value: "",
    path: "/",
    maxAge: -1,
    sameSite: "strict",
  });

  return {
    message: "Token successfully deleted.",
    status: "success",
  };
}
