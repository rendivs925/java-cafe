import { type ReactElement } from "react";
import CartIcon from "./CartIcon";

export interface HamburgerMenuOrCartProps {}

export default function HamburgerMenuOrCart(
  props: HamburgerMenuOrCartProps
): ReactElement {
  return (
    <>
      <div className="flex gap-6 items-center">
        <CartIcon />
        <div className="flex flex-col items-center justify-between h-6 w-9 lg:hidden">
          <span className="h-[2.5px] w-full bg-foreground rounded-lg"></span>
          <span className="h-[2.5px] w-full bg-foreground rounded-lg"></span>
          <span className="h-[2.5px] w-full bg-foreground rounded-lg"></span>
        </div>
      </div>
    </>
  );
}
