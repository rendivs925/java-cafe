import { useMemo, type ReactElement } from "react";
import CartProductCard from "./CartProductCard";
import { CartProduct } from "@/types";

export interface CartProductsListProps {}

export default function CartProductsList(
  props: CartProductsListProps
): ReactElement {
  const cartProductList: CartProduct[] = useMemo(
    () => [
      {
        id: 1,
        name: "Espresso",
        stock: 10,
        price: 80000,
        imageUrl: "/images/coffee-1.avif",
        category: "Coffee",
      },
      {
        id: 2,
        name: "Cappuccino",
        stock: 10,
        price: 80000,
        imageUrl: "/images/coffee2.avif",
        category: "Coffee",
      },
      {
        id: 3,
        name: "Latte",
        stock: 10,
        price: 80000,
        imageUrl: "/images/coffee3.avif",
        category: "Coffee",
      },
      {
        id: 4,
        name: "Mocha",
        stock: 10,
        price: 80000,
        imageUrl: "/images/coffee1.avif",
        category: "Coffee",
      },
    ],
    []
  );

  return (
    <ul className="flex flex-col gap-12">
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
