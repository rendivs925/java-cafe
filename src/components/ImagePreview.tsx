import { type ReactElement } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types";

export default function ImagePreview({
  title,
  stock,
  category,
  productId,
  description,
  price,
  imgUrl,
}: Product & { productId: string }): ReactElement {
  return (
    <ProductCard
      category={category || "espresso"}
      readonly={true}
      description={
        description ||
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis ut, fugit perferendis"
      }
      productId={productId || "id"}
      imgUrl={imgUrl || "https://via.placeholder.com/400"}
      price={price || 1000}
      stock={stock || 0}
      title={title || "Your product title"}
    />
  );
}
