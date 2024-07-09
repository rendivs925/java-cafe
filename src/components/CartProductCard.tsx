import { type ReactElement } from "react";
import { CartProduct } from "@/types";
import Image from "next/legacy/image";
import { Button } from "./ui/button";

export default function CartProductCard({
  imageUrl,
  name,
  stock,
  price,
}: Omit<CartProduct, "id">): ReactElement {
  return (
    <li className="cart-item">
      <div className="image w-24 rounded-lg mb-4 overflow-hidden h-24 relative">
        <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" />
      </div>
      <div className="detail">
        <h4 className="title mb-0 font-medium">{name}</h4>
        <p className="stock mt-1">Stok : {stock}</p>
      </div>
      <h4 className="price font-medium mt-4">Rp {price}</h4>
      <div className="qty-btn flex text-muted-foreground items-center">
        <Button size="sm" className="p-5 h-0  rounded-none">
          -
        </Button>
        <span className="bg-background text-foreground/80 h-5 p-5 font-medium flex items-center">
          3
        </span>
        <Button size="sm" className="rounded-none p-5 h-0">
          +
        </Button>
      </div>
      <div className="close-btn">x</div>
    </li>
  );
}
