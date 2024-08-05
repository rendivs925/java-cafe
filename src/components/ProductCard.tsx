"use client";
import Image from "next/legacy/image";
import { type ReactElement } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import useAppContext from "@/hooks/useAppContext";
import { addProductToCartAction } from "@/actions/addProductToCartAction";
import { Product } from "@/types";

function ProductCard({
  title,
  price,
  imgUrl,
  category,
  productId,
  stock,
  description,
}: Product & { productId: string }): ReactElement {
  const { user, formatNumber } = useAppContext();

  const addProductToCart = async () => {
    await addProductToCartAction({
      userId: user._id,
      products: [
        {
          productId,
          qty: 1,
          title,
          category,
          description,
          imgUrl,
          price,
          stock,
        },
      ],
    });
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
        <CardDescription className="mt-0 mb-4 bg-secondary py-1 px-5 font-normal rounded-lg text-sm w-min text-secondary-foreground">
          {category}
        </CardDescription>
        <CardTitle className="mt-0">{title}</CardTitle>
        <p className="line-clamp-2">{description}</p>
        <div className="flex mt-12 justify-between items-end overflow-hidden">
          <h3 className="price">IDR {formatNumber(price)}</h3>
          <Button variant="default" size="sm" onClick={addProductToCart}>
            Add To Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
