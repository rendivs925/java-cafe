"use client";
import Image from "next/legacy/image";
import { useState } from "react";
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
import LoadingButton from "./LoadingButton";
import { formatToRupiah } from "@/lib/formatToRupiah";
import Link from "next/link";

function ProductCard({
  title,
  price,
  imgUrl,
  category,
  productId,
  stock,
  description,
  profit,
  weight,
}: Product & {
  productId: string;
  weight: number;
  profit: number;
}): ReactElement {
  const { user, setTotalItems, formatNumber } = useAppContext();
  const [loading, setLoading] = useState(false);

  const addProductToCart = async () => {
    setLoading(true); // Set loading state to true
    try {
      const data = await addProductToCartAction({
        userId: user._id,
        products: [
          {
            productId,
            profit,
            title,
            imgUrl,
            price,
            stock,
            weight,
          },
        ],
      });

      setTotalItems((data?.totalItems as number) || 1);

      if (data?.status === "success") {
        toast({ description: data.message });
      }
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    } finally {
      setLoading(false); // Set loading state to false after operation
    }
  };

  return (
    <Card className="flex flex-col w-full overflow-hidden bg-transparent shadow-none">
      <CardHeader className="relative rounded-lg shadow aspect-square bg-transparent overflow-hidden">
        <Image
          src={imgUrl}
          loading="eager"
          alt="Product"
          className="aspect-square rounded-lg"
          layout="fill"
          objectFit="cover"
        />
      </CardHeader>
      <CardContent className="prose bg-transparent p-0 pt-6">
        <CardTitle className="mt-0">{title}</CardTitle>
        <p className="line-clamp-2">{description}</p>
        <div className="flex items-baseline justify-between overflow-hidden">
          <h4 className="price">{formatToRupiah(price)}</h4>
          <Link href={`/products/${productId}`}>Details</Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
