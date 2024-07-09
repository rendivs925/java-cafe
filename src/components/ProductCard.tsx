import Image from "next/legacy/image";
import { memo, type ReactElement } from "react";
import { Button } from "./ui/button";
import { Product } from "@/types";

function ProductCard({
  title,
  description,
  price,
  imgUrl,
}: Omit<Product, "id">): ReactElement {
  return (
    <div className="flex flex-col w-full rounded-lg shadow">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
        <Image src={imgUrl} alt="Product" layout="fill" objectFit="cover" />
      </div>
      <div className="bg-background px-6 py-6">
        <h3 className="mt-0">{title}</h3>
        <p>{description}</p>
        <div className="flex mt-12 justify-between items-end overflow-hidden">
          <h3 className="price">${price}</h3>{" "}
          <Button variant="default" size="sm">
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
