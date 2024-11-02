import { type ReactElement, Dispatch, SetStateAction } from "react";
import { navbarLinks } from "@/constanst";
import Link from "next/link";

// Define the type for each link item
type NavbarLink = {
  href: string;
  label: string;
};

interface NavbarItemListProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>
}

// Ensure `navbarLinks` is typed as an array of `NavbarLink` objects
export default function NavbarItemList({ isMobileMenuOpen, setIsMobileMenuOpen }: NavbarItemListProps): ReactElement {

  return (
    <>
      {/* Desktop view */}
      <ul className="hidden lg:flex lg:flex-row gap-8 justify-between">
        {navbarLinks.map(({ href, label }: NavbarLink, index: number) => (
          <li key={index}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>

      {/* Mobile view navigation menu */}
      <ul
        className={`flex flex-col gap-4 fixed top-0 left-0 w-full h-svh items-center bg-background transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-y-0 pt-navbar" : "-translate-y-full"
          } lg:hidden z-10`}
      >
        {navbarLinks.map(({ href, label }: NavbarLink, index: number) => (
          <li key={index} className="p-4 border-b border-gray-200">
            <Link href={href} onClick={() => setIsMobileMenuOpen(false)}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
