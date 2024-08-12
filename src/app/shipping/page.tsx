import { getUserCartAction } from "@/actions/getUserCartAction";
import LoadingIndicator from "@/components/LoadingIndicator";
import ShippingSteps from "@/components/ShippingSteps";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Java Cafe | Shipping",
};

export default async function Shipping() {
  const data = await getUserCartAction();
  const cart = data?.cart;

  return (
    <div className="container">
      <Suspense fallback={<LoadingIndicator />}>
        <ShippingSteps cart={cart} />
      </Suspense>
    </div>
  );
}
