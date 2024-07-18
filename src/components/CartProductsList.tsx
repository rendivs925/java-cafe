"use client";
import { type ReactElement } from "react";
import CartProductCard from "./CartProductCard";
import useAppContext from "@/hooks/useAppContext";
import useClientComponent from "@/hooks/useClientComponent";

export interface CartProductsListProps {
  className?: string;
}

export default function CartProductsList({
  className = "",
}: CartProductsListProps): ReactElement {
  const { cartProductList } = useAppContext();
  const isClient = useClientComponent();

  return (
    <ul className={`flex flex-col gap-12 ${className}`}>
      {cartProductList.length !== 0 && isClient ? (
        cartProductList.map(
          ({ id, title, stock, price, imgUrl, category, qty }) => (
            <CartProductCard
              key={id}
              id={id}
              qty={qty}
              title={title}
              stock={stock}
              price={price}
              imgUrl={imgUrl}
              category={category}
            />
          )
        )
      ) : (
        <li key="empty">
          <p className="mt-0">
            Keranjang anda masih kosong, silahkan berbelanja dulu..
          </p>
        </li>
      )}
    </ul>
  );
}
