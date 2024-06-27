import { CartProductsList, OrderSummary } from "@/components";
import { type ReactElement } from "react";

export interface CartProps {}

export default function Cart(props: CartProps): ReactElement {
  return (
    <section className="py-navbar">
      <h1 className="container pt-navbar">Keranjang Anda</h1>
      <div className="container mt-14 grid gap-navbar md:grid-cols-cart">
        <div className="w-full">
          <CartProductsList />
        </div>
        <div className="w-full">
          <OrderSummary />
        </div>
      </div>
    </section>
  );
}
