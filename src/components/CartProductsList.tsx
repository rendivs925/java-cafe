"use client";
import CartProductCard from "./CartProductCard";
import { useOptimistic } from "react";
import { ICart } from "@/models/Cart";

export default function CartProductsList({
  cart,
  className,
}: {
  cart: ICart;
  className?: string;
}) {
  const [optimisticCart, setOptimisticCart] = useOptimistic(cart);
  const products = optimisticCart?.products;

  return (
    <ul className={`flex flex-col gap-12 ${className}`}>
      {products.length !== 0 ? (
        products.map(({ title, productId, stock, price, imgUrl, qty }) => (
          <CartProductCard
            key={productId}
            cart={cart}
            optimisticCart={optimisticCart}
            setOptimisticCart={setOptimisticCart}
            qty={qty as number}
            title={title}
            stock={stock}
            productId={productId}
            price={price}
            imgUrl={imgUrl}
            userId={cart.userId}
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
