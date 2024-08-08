"use client";
import { useOptimistic, type ReactElement } from "react";
import CartProductsList from "./CartProductsList";
import OrderSummary from "./OrderSummary";
import { ICart } from "@/models/Cart";

export interface CartContentProps {
  cart: ICart;
}

export default function CartContent({ cart }: CartContentProps): ReactElement {
  const [optimisticCart, setOptimisticCart] = useOptimistic(cart);

  return (
    <div className="container mt-14 grid gap-navbar md:grid-cols-cart">
      <div className="w-full">
        <CartProductsList
          setOptimisticCart={setOptimisticCart}
          optimisticCart={optimisticCart}
        />
      </div>
      <div className="w-full">
        <OrderSummary optimisticCart={optimisticCart} />
      </div>
    </div>
  );
}
