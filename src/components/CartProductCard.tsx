import { type ReactElement } from "react";
import { CartProduct } from "@/types";
import Image from "next/legacy/image";
import { Button } from "./ui/button";
import { Card, CardTitle } from "./ui/card";

export default function CartProductCard({
  imageUrl,
  name,
  stock,
  price,
}: Omit<CartProduct, "id">): ReactElement {
  return (
    <Card className="cart-item bg-transparent shadow-none">
      <div className="image w-24 rounded-lg mb-4 overflow-hidden h-24 relative">
        <Image
          src={imageUrl}
          loading="eager"
          alt={name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="detail space-y-1.5">
        <CardTitle className="title">{name}</CardTitle>
        <p className="stock">Stok : {stock}</p>
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
    </Card>
  );
}
