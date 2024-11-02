"use client";
import { useState, type ReactElement } from "react";
import NavbarHeading from "./NavbarHeading";
import NavbarItemList from "./NavbarItemList";
import HamburgerMenuWithCartAndAuthButtons from "./HamburgerMenuWithCartAndAuthButtons";

export default function Navbar(): ReactElement {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="navbar glass w-full box-border bg-background shadow fixed top-[0] left-[0] right-[0] z-10">
      <nav className="md:container flex items-center h-full justify-between">
        <NavbarHeading />
        <NavbarItemList isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <HamburgerMenuWithCartAndAuthButtons toggleMobileMenu={toggleMobileMenu} />
      </nav>
    </header>
  );
}
