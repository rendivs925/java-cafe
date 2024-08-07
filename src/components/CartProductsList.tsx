"use client";
import CartProductCard from "./CartProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import useAppContext from "@/hooks/useAppContext";

export interface CartProductsListProps {
  className?: string;
}

export default function CartProductsList({
  className = "",
}: CartProductsListProps) {
  const { user, cart, optimisticCart, defaultCart, setCart } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Replace with the actual userId
        const response = await axios.get(`/api/cart`, {
          headers: {
            userId: user._id,
          },
        });

        if (response.status === 200) {
          if (response.data.cart) return setCart(response.data?.cart);
        } else {
          setError(response.data.message);
          setCart(defaultCart);
        }
      } catch (error) {
        setError("Error fetching cart data");
        setCart(defaultCart);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  return (
    <ul className={`flex flex-col gap-12 ${className}`}>
      {optimisticCart?.products ? (
        optimisticCart?.products?.map(
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
