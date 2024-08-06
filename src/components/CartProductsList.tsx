"use client";
import { ICartProduct } from "@/models/Cart";
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
  const { user } = useAppContext();
  const [cart, setCart] = useState<ICartProduct[]>([]);
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

        console.log(response);

        if (response.status === 200) {
          if (response.data.cart.products)
            return setCart(response.data?.cart.products);
        } else {
          setError(response.data.message);
          setCart([]);
        }
      } catch (error) {
        setError("Error fetching cart data");
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  return (
    <ul className={`flex flex-col gap-12 ${className}`}>
      {cart?.length !== 0 ? (
        cart?.map(({ title, stock, price, imgUrl, qty }) => (
          <CartProductCard
            qty={qty}
            title={title}
            stock={stock}
            price={price}
            imgUrl={imgUrl}
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
