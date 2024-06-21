"use client";
import { type ReactElement } from "react";
import Button from "./Button";
import Image from "next/image";
import { navbarLinks } from "@/constanst";
import Link from "next/link";

export default function Navbar(): ReactElement {
  return (
    <header className="h-14xl w-full box-border shadow fixed top-[0] left-[0] right-[0] bg-primary z-10">
      <nav className="container flex items-center h-full justify-between">
        <h2 className="mb-[0] leading-[0]">Java Cafe</h2>

        <ul className="justify-between hidden lg:flex gap-xl">
          {navbarLinks.map(({ href, label }, index) => {
            return (
              <li key={index}>
                <Link href={href}>{label}</Link>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-lg items-center">
          <Button type="button" className="mt-[0]" variant="icon">
            <Image src="/images/cart.png" alt="Cart" width={32} height={32} />
          </Button>
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
