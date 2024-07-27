import { type ReactElement } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types";

export default function ImagePreview({
  title,
  stock,
  category,
  id,
  description,
  price,
  imgUrl,
}: Product): ReactElement {
  return (
    <ProductCard
      category={category || "espresso"}
      description={
        description ||
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis ut, fugit perferendis"
      }
      id={id || "id"}
      imgUrl={imgUrl || "https://via.placeholder.com/400"}
      price={price || 1000}
      stock={stock || 0}
      title={title || "Your product title"}
    />
  );
}
