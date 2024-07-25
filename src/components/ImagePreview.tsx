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
      category={category || "coffee"}
      description={
        description ||
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis ut, fugit perferendis repudiandae"
      }
      id={id}
      imgUrl={imgUrl || "https://via.placeholder.com/400"}
      price={price || 0}
      stock={stock}
      title={title || "Product Title"}
    />
  );
}
