import CartProductsList from "@/components/CartProductsList";
import OrderSummary from "@/components/OrderSummary";
import { getUserCartAction } from "@/actions/getUserCartAction";

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
      <div className="container mt-14 grid gap-navbar md:grid-cols-cart">
        <div className="w-full">
          <CartProductsList cart={cart} />
        </div>
        <div className="w-full">
          <OrderSummary userId={userId} />
        </div>
      </div>
    </section>
  );
}
