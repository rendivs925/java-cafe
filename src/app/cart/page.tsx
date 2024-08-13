import type { Metadata } from "next";
import CartContent from "@/components/CartContent";

export const metadata: Metadata = {
  title: "Java Cafe | Cart",
};

export default function Cart() {
  return (
    <section className="py-navbar">
      <h1 className="container pt-navbar">Keranjang Anda</h1>
      <CartContent />
    </section>
  );
}
