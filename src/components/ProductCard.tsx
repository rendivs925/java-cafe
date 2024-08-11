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
import { toast } from "./ui/use-toast";

function ProductCard({
  title,
  price,
  imgUrl,
  category,
  productId,
  stock,
  description,
}: Product & { productId: string }): ReactElement {
  const { user, setTotalItems, formatNumber } = useAppContext();

  const addProductToCart = async () => {
    const data = await addProductToCartAction({
      userId: user._id,
      products: [
        {
          productId,
          title,
          imgUrl,
          price,
          stock,
        },
      ],
    });

    setTotalItems(data?.totalItems as number);

    if (data?.status === "success") {
      toast({ description: data.message });
    }
  };

  return (
    <Card className="flex flex-col w-full rounded-lg overflow-hidden shadow p-6">
      <CardHeader className="relative aspect-square rounded-md shadow overflow-hidden">
        <Image
          src={imgUrl}
          loading="eager"
          alt="Product"
          layout="fill"
          objectFit="cover"
        />
      </CardHeader>
      <CardContent className="bg-background px-0 pt-6 pb-0">
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
