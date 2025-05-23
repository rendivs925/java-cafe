import { type ReactElement } from "react";
import CartIcon from "./CartIcon";
import AuthNavButtons from "./AuthNavButtons";
import useAppContext from "@/hooks/useAppContext";
import useClientComponent from "@/hooks/useClientComponent";
import AvatarMenu from "./AvatarMenu";

interface HamburgerMenuWithCartAndAuthButtonsProps {
  toggleMobileMenu: () => void;
}

export default function HamburgerMenuWithCartAndAuthButtons({
  toggleMobileMenu,
}: HamburgerMenuWithCartAndAuthButtonsProps): ReactElement {
  const { user } = useAppContext();
  const isClient = useClientComponent();

  return (
    <>
      <div className="flex cursor-pointer gap-6 items-center">
        <AuthNavButtons />
        {user.role === "user" && user._id.toString() !== "" && isClient && (
          <CartIcon />
        )}
        {user.imgUrl && isClient && <AvatarMenu user={user} />}
        <div
          onClick={toggleMobileMenu}
          className="flex z-[100] flex-col items-center justify-between h-6 w-9 lg:hidden"
        >
          <span className="h-[3.5px] w-full bg-foreground rounded-lg"></span>
          <span className="h-[3.5px] w-full bg-foreground rounded-lg"></span>
          <span className="h-[3.5px] w-full bg-foreground rounded-lg"></span>
        </div>
      </div>
    </>
  );
}
