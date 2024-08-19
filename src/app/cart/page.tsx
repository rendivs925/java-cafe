import type { Metadata } from "next";
import { getUserCartAction } from "@/actions/getUserCartAction";
import CartContent from "@/components/CartContent";
import BaseContainer from "@/components/BaseContainer";
import BaseHeader from "@/components/BaseHeader";
import BaseContent from "@/components/BaseContent";

export const metadata: Metadata = {
  title: "Java Cafe | Cart",
};

export default async function Cart() {
  const data = await getUserCartAction();
  const cart = data?.cart;

  return (
    <BaseContainer>
      <BaseHeader title="Keranjang Anda" />

      <BaseContent>
        <CartContent cart={cart} />
      </BaseContent>
    </BaseContainer>
  );
}
