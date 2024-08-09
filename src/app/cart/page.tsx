import type { Metadata } from "next";
import { getUserCartAction } from "@/actions/getUserCartAction";
import CartContent from "@/components/CartContent";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Java Cafe | Cart",
};

export default async function Cart({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const userId = (searchParams["user_id"] as string) ?? "";
  const data = await getUserCartAction(userId);
  const cart = data?.cart;

  return (
    <section className="py-navbar">
      <h1 className="container pt-navbar">Keranjang Anda</h1>
      <Suspense>
        <CartContent cart={cart} />
      </Suspense>
    </section>
  );
}
