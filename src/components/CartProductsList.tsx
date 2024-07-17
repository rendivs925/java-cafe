"use client";
import { type ReactElement } from "react";
import CartProductCard from "./CartProductCard";
import useAppContext from "@/hooks/useAppContext";

export interface CartProductsListProps {
  className?: string | null;
}

export default function CartProductsList({
  className = null,
}: CartProductsListProps): ReactElement {
  const { cartProductList } = useAppContext();

  return (
    <ul
      suppressHydrationWarning
      className={`flex flex-col gap-12 ${className}`}
    >
      {cartProductList.length !== 0 ? (
        cartProductList.map(({ id, title, stock, price, imgUrl, category }) => (
          <CartProductCard
            key={id}
            title={title}
            stock={stock}
            price={price}
            imgUrl={imgUrl}
            category={category}
          />
        ))
      ) : (
        <p className="mt-0">
          Keranjang anda masih kosong, silahkan berbelanja dulu..
        </p>
      )}
    </ul>
  );
}
