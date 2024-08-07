import { type ReactElement } from "react";
import CartProductsList from "@/components/CartProductsList";
import OrderSummary from "@/components/OrderSummary";

export default function Cart({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): ReactElement {
  const userId = (searchParams["user_id"] as string) ?? "";

  return (
    <section className="py-navbar">
      <h1 className="container pt-navbar">Keranjang Anda</h1>
      <div className="container mt-14 grid gap-navbar md:grid-cols-cart">
        <div className="w-full">
          <CartProductsList userId={userId} />
        </div>
        <div className="w-full">
          <OrderSummary userId={userId} />
        </div>
      </div>
    </section>
  );
}
