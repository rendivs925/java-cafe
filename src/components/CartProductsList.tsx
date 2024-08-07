import { getUserCartAction } from "@/actions/getUserCartAction";
import CartProductCard from "./CartProductCard";

export default async function CartProductsList({
  userId,
  className,
}: {
  userId: string;
  className?: string;
}) {
  const data = await getUserCartAction(userId);

  return (
    <ul className={`flex flex-col gap-12 ${className}`}>
      {data?.cart?.products ? (
        data?.cart?.products?.map(
          ({ title, productId, stock, price, imgUrl, qty }) => (
            <CartProductCard
              key={productId}
              qty={qty as number}
              title={title}
              stock={stock}
              productId={productId}
              price={price}
              imgUrl={imgUrl}
            />
          )
        )
      ) : (
        <li key="empty">
          <p className="mt-0">
            Keranjang anda masih kosong, silahkan berbelanja dulu..
          </p>
        </li>
      )}
    </ul>
  );
}
