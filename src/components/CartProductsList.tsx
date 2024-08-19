"use client";
import CartProductCard from "./CartProductCard";
import { ICart } from "@/models/Cart";

export default function CartProductsList({
  optimisticCart,
  className,
  setOptimisticCart,
  deleteProductFromCart,
}: {
  optimisticCart: ICart;
  setOptimisticCart: (action: ICart | ((pendingState: ICart) => ICart)) => void;
  className?: string;
  deleteProductFromCart: (productId: string) => void;
}) {
  const products = optimisticCart?.products;

  return (
    <ul className={`flex flex-col gap-6 ${className}`}>
      {products?.length !== 0 ? (
        products?.map(({ title, productId, stock, price, imgUrl, qty }) => (
          <CartProductCard
            key={productId}
            optimisticCart={optimisticCart}
            setOptimisticCart={setOptimisticCart}
            qty={qty as number}
            title={title}
            stock={stock}
            productId={productId}
            price={price}
            imgUrl={imgUrl}
            deleteProductFromCart={deleteProductFromCart}
          />
        ))
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
