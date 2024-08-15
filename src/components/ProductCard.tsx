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

      setTotalItems(data?.totalItems as number);

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
    <Card className="flex flex-col w-full rounded-lg overflow-hidden shadow">
      <CardHeader className="relative aspect-square overflow-hidden">
        <Image
          src={imgUrl}
          loading="eager"
          alt="Product"
          layout="fill"
          objectFit="cover"
        />
      </CardHeader>
      <CardContent className="bg-background p-6">
        <CardDescription className="mt-0 mb-4 bg-secondary py-1 px-5 font-normal rounded-lg text-sm w-min text-secondary-foreground">
          {category}
        </CardDescription>
        <CardTitle className="mt-0">{title}</CardTitle>
        <p className="line-clamp-2">{description}</p>
        <div className="flex mt-12 justify-between items-end overflow-hidden">
          <h3 className="price">IDR {formatNumber(price)}</h3>
          <Button
            variant="default"
            size="sm"
            onClick={addProductToCart}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Adding..." : "Add To Cart"} {/* Show loading text */}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
