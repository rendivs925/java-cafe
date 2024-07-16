import { useMemo, type ReactElement } from "react";
import CartProductCard from "./CartProductCard";
import { CartProduct } from "@/types";

export interface CartProductsListProps {
  className?: string | null;
}

export default function CartProductsList({
  className = null,
}: CartProductsListProps): ReactElement {
  const cartProductList: CartProduct[] = useMemo(
    () => [
      {
        id: 1,
        name: "Espresso",
        stock: 10,
        price: 80000,
        imageUrl: "/images/product-1.jpg",
        category: "Coffee",
      },
      {
        id: 2,
        name: "Cappuccino",
        stock: 10,
        price: 80000,
        imageUrl: "/images/product-2.jpg",
        category: "Coffee",
      },
      {
        id: 3,
        name: "Latte",
        stock: 10,
        price: 80000,
        imageUrl: "/images/product-3.jpg",
        category: "Coffee",
      },
    ],
    []
  );

  return (
    <ul className={`flex flex-col gap-12 ${className}`}>
      {cartProductList.map(({ id, name, stock, price, imageUrl, category }) => (
        <CartProductCard
          key={id}
          name={name}
          stock={stock}
          price={price}
          imageUrl={imageUrl}
          category={category}
        />
      ))}
    </ul>
  );
}
