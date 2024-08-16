"use client";
import { type ReactElement } from "react";
import CartIcon from "./CartIcon";
import AuthNavButtons from "./AuthNavButtons";
import useAppContext from "@/hooks/useAppContext";
import useClientComponent from "@/hooks/useClientComponent";
import AvatarMenu from "./AvatarMenu";

export default function HamburgerMenuWithCartAndAuthButtons(): ReactElement {
  const { user } = useAppContext();
  const isClient = useClientComponent();

  return (
    <>
      <div className="flex gap-6 items-center">
        <AuthNavButtons />
        {user.role === "user" && user._id !== "" && isClient && <CartIcon />}
        {user.imgUrl && isClient && <AvatarMenu user={user} />}
        <div className="flex flex-col items-center justify-between h-6 w-9 lg:hidden">
          <span className="h-[2.5px] w-full bg-foreground rounded-lg"></span>
          <span className="h-[2.5px] w-full bg-foreground rounded-lg"></span>
          <span className="h-[2.5px] w-full bg-foreground rounded-lg"></span>
        </div>
      </div>
    </>
  );
}
