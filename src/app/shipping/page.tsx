import { getUserCartAction } from "@/actions/getUserCartAction";
import ShippingSteps from "@/components/ShippingSteps";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Java Cafe | Shipping",
};

export default async function Shipping() {
  const data = await getUserCartAction();
  const cart = data?.cart;

  return (
    <div className="container">
      <ShippingSteps cart={cart} />
    </div>
  );
}
