import { getUserCartAction } from "@/actions/getUserCartAction";
import ShippingSteps from "@/components/ShippingSteps";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Java Cafe | Shipping",
};

export default async function Shipping({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const userId = (searchParams["user_id"] as string) ?? "";
  const data = await getUserCartAction(userId);
  const cart = data?.cart;

  return (
    <div className="container">
      <ShippingSteps cart={cart} />
    </div>
  );
}
