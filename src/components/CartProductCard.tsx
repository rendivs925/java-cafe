import { type ReactElement } from "react";
import { Product } from "@/types";
import Image from "next/legacy/image";
import { Button } from "./ui/button";
import { Card, CardTitle } from "./ui/card";

export default function CartProductCard({
  imgUrl,
  title,
  stock,
  price,
}: Omit<Product, "id" | "description">): ReactElement {
  return (
    <Card className="cart-item bg-transparent shadow-none">
      <div className="image rounded-lg mb-4 overflow-hidden relative">
        <Image
          src={imgUrl}
          width={96}
          height={96}
          loading="eager"
          alt={title}
          objectFit="cover"
        />
      </div>
      <div className="detail space-y-1.5">
        <CardTitle className="title">{title}</CardTitle>
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
