"use client";
import { type ReactElement } from "react";
import { IoCart } from "react-icons/io5";
import Link from "next/link";
import useClientComponent from "@/hooks/useClientComponent";
import useAppContext from "@/hooks/useAppContext";

export default function CartIcon(): ReactElement {
  const { cartProductList } = useAppContext();
  const isClient = useClientComponent();
  const totalItems = cartProductList.length;

  return (
    <>
      {isClient ? (
        <Link href="/cart" className="relative hover:after:w-0">
          {" "}
          <IoCart className="text-2xl relative" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-500 text-primary-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      ) : (
        <Link href="/cart" className="relative hover:after:w-0">
          <IoCart className="text-2xl relative" />
        </Link>
      )}
    </>
  );
}
