import { type ReactElement } from "react";
import { CartProduct } from "@/types";
import Image from "next/legacy/image";
import { Button } from "./ui/button";
import { Card, CardTitle } from "./ui/card";
import useAppContext from "@/hooks/useAppContext";
import axios from "axios";

export default function CartProductCard({
  imgUrl,
  title,
  stock,
  price,
  qty,
  productId,
}: CartProduct & { productId: string }): ReactElement {
  const { setCart, cart, optimisticCart, setOptimisticCart } = useAppContext();

  const incrementQuantity = async () => {
    try {
      // Find the product index
      const itemIndex = optimisticCart.products.findIndex(
        (item) => item.productId === productId
      );

      if (itemIndex !== -1) {
        // Optimistically update the cart state
        setOptimisticCart((prevCart) => {
          const updatedProducts = [...prevCart.products];
          updatedProducts[itemIndex] = {
            ...updatedProducts[itemIndex],
            qty: (updatedProducts[itemIndex] as { qty: number }).qty + 1,
          };

          return {
            ...prevCart,
            products: updatedProducts,
          };
        });
      }

      const response = await axios.post("/api/cart/increment", {
        userId: cart.userId,
        productId,
      });

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      // Refetch the updated cart data
      const updatedCartResponse = await axios.get(`/api/cart`, {
        headers: {
          userId: cart?.userId,
        },
      });
      const updatedCart = updatedCartResponse.data.cart;

      // Update the cart state with the refetched data
      setCart(updatedCart);
    } catch (error) {
      console.error(
        "Failed to increment quantity:",
        (error as { message: string }).message
      );
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
        <h4 className="price font-medium mt-4">IDR {price * qty}</h4>
        <div className="qty-btn flex text-muted-foreground items-center">
          <Button
            size="sm"
            // onClick={decrementQuantity}
            className="p-5 h-0  rounded-none"
          >
            -
          </Button>
          <span className="bg-background text-foreground/80 h-5 p-5 font-medium flex items-center">
            {qty}
          </span>
          <Button
            size="sm"
            onClick={incrementQuantity}
            className="rounded-none p-5 h-0"
          >
            +
          </Button>
        </div>
        <Button
          size="icon"
          variant="ghost"
          // onClick={deleteProductFromCart}
          className="close-btn text-xl"
        >
          x
        </Button>
      </Card>
    </li>
  );
}
