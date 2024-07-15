import { type ReactElement } from "react";
import NavbarHeading from "./NavbarHeading";
import NavbarItemList from "./NavbarItemList";
import HamburgerMenuOrCart from "./HamburgerMenuOrCart";

export default function Navbar(): ReactElement {
  return (
    <header className="navbar glass w-full box-border bg-background shadow fixed top-[0] left-[0] right-[0] z-10">
      <nav className="container flex items-center h-full justify-between">
        <NavbarHeading />
        <NavbarItemList />
        <HamburgerMenuOrCart />
      </nav>
    </header>
  );
}
