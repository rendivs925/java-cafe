"use client";
import { startTransition, useOptimistic, type ReactElement } from "react";
import CartProductsList from "./CartProductsList";
import OrderSummary from "./OrderSummary";
import { ICart } from "@/models/Cart";
import useAppContext from "@/hooks/useAppContext";
import { setCartAction } from "@/actions/setCartAction";

export interface CartContentProps {
  cart: ICart;
}

export default function CartContent({ cart }: CartContentProps): ReactElement {
  const [optimisticCart, setOptimisticCart] = useOptimistic(cart);
  const { setTotalItems } = useAppContext();

  const deleteProductFromCart = async (productId: string) => {
    setTotalItems((prev) => prev - 1);

    // Optimistic update and side-effects should be handled in a separate function
    startTransition(async () => {
      try {
        // Optimistically update cart state
        setOptimisticCart((prev) => {
          const updatedProducts = prev.products.filter(
            (item) => item.productId !== productId
          );

          return {
            userId: prev.userId,
            products: updatedProducts,
          };
        });

        // Perform server updates
        const newCart = {
          userId: optimisticCart.userId,
          products: optimisticCart.products.filter(
            (item) => item.productId !== productId
          ),
        };

        await setCartAction(newCart);
      } catch (error) {
        console.error("Failed to delete product from cart", error);
      }
    });
  };

  return (
    <div className="grid gap-navbar md:grid-cols-cart">
      <div className="w-full">
        <CartProductsList
          deleteProductFromCart={deleteProductFromCart}
          setOptimisticCart={setOptimisticCart}
          optimisticCart={optimisticCart}
        />
      </div>
      <div className="w-full">
        <OrderSummary optimisticCart={optimisticCart} />
      </div>
    </div>
  );
}
