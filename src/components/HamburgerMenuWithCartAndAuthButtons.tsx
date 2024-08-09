"use client";
import { type ReactElement } from "react";
import CartIcon from "./CartIcon";
import AuthNavButtons from "./AuthNavButtons";
import useAppContext from "@/hooks/useAppContext";
import { Avatar, AvatarImage } from "./ui/avatar";
import useClientComponent from "@/hooks/useClientComponent";

export default function HamburgerMenuWithCartAndAuthButtons(): ReactElement {
  const { user } = useAppContext();
  const isClient = useClientComponent();

  return (
    <>
      <div className="flex gap-6 items-center">
        <AuthNavButtons />
        {user.role === "user" && user._id !== "" && isClient && <CartIcon />}
        {user.imgUrl && isClient && (
          <div className="empty:hidden text-sm bg-secondary text-secondary-foreground rounded-full leading-0 flex items-center justify-center size-9">
            <Avatar className="size-full">
              <AvatarImage src={user.imgUrl} />
            </Avatar>
          </div>
        )}
        <div className="flex flex-col items-center justify-between h-6 w-9 lg:hidden">
          <span className="h-[2.5px] w-full bg-foreground rounded-lg"></span>
          <span className="h-[2.5px] w-full bg-foreground rounded-lg"></span>
          <span className="h-[2.5px] w-full bg-foreground rounded-lg"></span>
        </div>
      </div>
    </>
  );
}
