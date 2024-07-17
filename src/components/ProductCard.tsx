"use client";
import Image from "next/legacy/image";
import { memo, type ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Product } from "@/types";
import useAppContext from "@/hooks/useAppContext";

function ProductCard({
  title,
  description,
  price,
  imgUrl,
  id,
  category,
  stock,
}: Product): ReactElement {
  const { setCartProductList } = useAppContext();
  const addProductToCart = () => {
    setCartProductList((prev) => [
      ...prev,
      { id, title, category, imgUrl, price, stock },
    ]);
  };

  return (
    <Card className="flex flex-col w-full rounded-lg overflow-hidden shadow">
      <CardHeader className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={imgUrl}
          loading="eager"
          alt="Product"
          layout="fill"
          objectFit="cover"
        />
      </CardHeader>
      <CardContent className="bg-background px-6 py-6">
        <CardTitle className="mt-0">{title}</CardTitle>
        <p>{description}</p>
        <div className="flex mt-12 justify-between items-end overflow-hidden">
          <h3 className="price">${price}</h3>{" "}
          <Button variant="default" size="sm" onClick={addProductToCart}>
            Add To Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(ProductCard);
