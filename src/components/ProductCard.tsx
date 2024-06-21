import Image from "next/image";
import { type ReactElement } from "react";
import Button from "./Button";
import { Product } from "@/types";

export default function ProductCard({
  title,
  description,
  price,
}: Omit<Product, "id">): ReactElement {
  return (
    <div className="flex flex-col w-full rounded-lg shadow overflow-hidden">
      <div className="relative aspect-[2/3]">
        <Image
          src="/images/coffee-1.avif"
          alt="Product"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="bg-secondary px-lg py-md">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="flex mt-7xl justify-between items-center">
          <h3 className="mb-[0]">${price}</h3>{" "}
          <Button className="mt-[0]">Buy Now</Button>
        </div>
      </div>
    </div>
  );
}
