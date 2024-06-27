"use client";
import { type ReactElement } from "react";
import Image from "next/image";
import { navbarLinks } from "@/constanst";
import Link from "next/link";

export default function Navbar(): ReactElement {
  return (
    <header className="navbar w-full box-border shadow fixed top-[0] left-[0] right-[0] bg-background z-10">
      <nav className="container flex items-center h-full justify-between">
        <Link href="/" className="hover:text-foreground">
          <h3 className="m-0 p-0 leading-0">Java Cafe</h3>
        </Link>

        <ul className="justify-between hidden lg:flex gap-8">
          {navbarLinks.map(({ href, label }, index) => {
            return (
              <li key={index}>
                <Link href={href}>{label}</Link>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-lg items-center">
          <Link href="/cart">
            <Image src="/images/cart.png" alt="Cart" width={28} height={28} />
          </Link>
          <div className="flex flex-col items-center justify-between h-lg w-3xl lg:hidden">
            <span className="h-[2.5px] w-full bg-heading rounded-lg"></span>
            <span className="h-[2.5px] w-full bg-heading rounded-lg"></span>
            <span className="h-[2.5px] w-full bg-heading rounded-lg"></span>
          </div>
        </div>
      </nav>
    </header>
  );
}
