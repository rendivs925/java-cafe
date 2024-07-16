import Link from "next/link";
import { type ReactElement } from "react";
import { IoCart } from "react-icons/io5";

export interface HamburgerMenuOrCartProps {}

export default function HamburgerMenuOrCart(
  props: HamburgerMenuOrCartProps
): ReactElement {
  return (
    <>
      <div className="flex gap-6 items-center">
        <Link href="/cart" className="hover:after:w-0">
          <IoCart className="text-lg" />
        </Link>
        <div className="flex flex-col items-center justify-between h-6 w-9 lg:hidden">
          <span className="h-[2.5px] w-full bg-foreground rounded-lg"></span>
          <span className="h-[2.5px] w-full bg-foreground rounded-lg"></span>
          <span className="h-[2.5px] w-full bg-foreground rounded-lg"></span>
        </div>
      </div>
    </>
  );
}
