"use client";
import { navbarLinks } from "@/constanst";
import Link from "next/link";
import { type ReactElement } from "react";

export interface NavbarItemListProps {}

export default function NavbarItemList(
  props: NavbarItemListProps
): ReactElement {
  return (
    <>
      <ul className="justify-between hidden lg:flex gap-8">
        {navbarLinks.map(({ href, label }, index) => {
          return (
            <li key={index}>
              <Link href={href}>{label}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
