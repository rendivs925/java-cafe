import { memo, startTransition, useState, type ReactElement } from "react";
import { CartProduct } from "@/types";
import Image from "next/legacy/image";
import { Button } from "./ui/button";
import { Card, CardTitle } from "./ui/card";
import CartProductPrice from "./CartProductPrice";
import { ICart } from "@/models/Cart";

function CartProductCard({
  imgUrl,
  title,
  stock,
  price,
  qty,
  productId,
  optimisticCart,
  setOptimisticCart,
  deleteProductFromCart,
}: CartProduct & {
  productId: string;
  optimisticCart: ICart;
  setOptimisticCart: (action: ICart | ((pendingState: ICart) => ICart)) => void;
  deleteProductFromCart: (productId: string) => void;
}): ReactElement {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateQuantity = (type: "increment" | "decrement") => {
    if (isUpdating) return;
    setIsUpdating(true);

    try {
      const itemIndex = optimisticCart.products.findIndex(
        (product) => product.productId === productId
      );

      if (itemIndex !== -1) {
        startTransition(() => {
          setOptimisticCart((prev) => {
            const updatedProducts = [...prev.products];
            if (
              type === "increment" &&
              (updatedProducts[itemIndex] as { qty: number }).qty <
                updatedProducts[itemIndex].stock
            ) {
              (updatedProducts[itemIndex] as { qty: number }).qty += 1;
            } else if (
              type === "decrement" &&
              (updatedProducts[itemIndex] as { qty: number }).qty > 1
            ) {
              (updatedProducts[itemIndex] as { qty: number }).qty -= 1;
            }

            return {
              userId: optimisticCart.userId,
              products: updatedProducts,
            };
          });
        });
      }
    } catch (error) {
      console.error(`Failed to ${type} quantity`, error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <li>
      <Card className="cart-item bg-transparent overflow-visible shadow-none">
        <div className="image rounded-lg mb-4">
          <Image
            src={imgUrl}
            width={96}
            height={96}
            loading="eager"
            alt={title}
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="detail space-y-1.5">
          <CardTitle className="title">{title}</CardTitle>
          <p className="stock">Stok : {stock}</p>
        </div>
        <CartProductPrice price={price} qty={qty} />
        <div className="qty-btn flex text-muted-foreground items-center">
          <Button
            size="sm"
            onClick={() => updateQuantity("decrement")}
            className="p-5 h-0 rounded-none"
          >
            -
          </Button>
          <span className="bg-background text-foreground/80 h-5 p-5 font-medium flex items-center">
            {qty}
          </span>
          <Button
            size="sm"
            onClick={() => updateQuantity("increment")}
            className="rounded-none p-5 h-0"
          >
            +
          </Button>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => deleteProductFromCart(productId)}
          className="close-btn text-xl"
        >
          x
        </Button>
      </Card>
    </li>
  );
}

export default memo(CartProductCard);
