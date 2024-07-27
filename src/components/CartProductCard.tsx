import { type ReactElement } from "react";
import { CartProduct } from "@/types";
import Image from "next/legacy/image";
import { Button } from "./ui/button";
import { Card, CardTitle } from "./ui/card";
import useAppContext from "@/hooks/useAppContext";

export default function CartProductCard({
  imgUrl,
  title,
  stock,
  price,
  // category,
  id,
  qty,
}: CartProduct): ReactElement {
  const { formatNumber, updateQuantity, setCartProductList } = useAppContext();

  const incrementQuantity = () => {
    updateQuantity(id as number, "increment");
  };

  const deleteProductFromCart = () => {
    setCartProductList((prev) => prev.filter((item) => item.id !== id));
  };

  const decrementQuantity = () => {
    updateQuantity(id as number, "decrement");
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
        <h4 className="price font-medium mt-4">
          IDR {formatNumber(price * qty)}
        </h4>
        <div className="qty-btn flex text-muted-foreground items-center">
          <Button
            size="sm"
            onClick={decrementQuantity}
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
          onClick={deleteProductFromCart}
          className="close-btn text-xl"
        >
          x
        </Button>
      </Card>
    </li>
  );
}
