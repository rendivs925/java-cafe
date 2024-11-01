"use client";
import Image from "next/legacy/image";
import { ProductType } from "@/components/ProductsList";
import { Button } from "./ui/button";
import { type ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { formatToRupiah } from "@/lib/formatToRupiah";
import useAppContext from "@/hooks/useAppContext";

function ProductCard({
  title,
  price,
  imgUrl,
  _id,
  description,
  readonly = false,
  profit, stock, weight
}: ProductType & {
  readonly?: boolean;
}): ReactElement {
  const { pushRoute } = useAppContext();
  const { addProductToCart } = useAppContext();

  const handleAddToCartClick = () => {
    addProductToCart({
      productId: _id,
      profit,
      title,
      imgUrl,
      price,
      stock,
      weight,
    });
  };

  const handleClick = () => {
    !readonly && pushRoute(`/products/${_id}`);
  };

  return (
    <Card className="flex flex-col w-full overflow-hidden bg-transparent shadow-none">
      <CardHeader onClick={handleClick}
        className="relative rounded-lg shadow aspect-square bg-transparent cursor-pointer overflow-hidden">
        <Image
          src={imgUrl}
          loading="eager"
          alt={title}
          className="aspect-square rounded-lg hover:scale-125 transition-all duration-300"
          layout="fill"
          objectFit="cover"
        />
      </CardHeader>
      <CardContent className="prose bg-transparent p-0 pt-6">
        <CardTitle onClick={handleClick} className="mt-0 cursor-pointer">{title}</CardTitle>
        <p className="line-clamp-2">{description}</p>
        <div className="flex items-baseline justify-between overflow-hidden">
          <h4 className="price">{formatToRupiah(price)}</h4>
          <Button onClick={handleAddToCartClick} variant="link" className="underline">
            <h3>Add to Cart</h3>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
