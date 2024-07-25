import { type ReactElement } from "react";
import ProductCard from "./ProductCard";

export default function ImagePreview({
  imageSrc,
}: {
  imageSrc: string | ArrayBuffer | null;
}): ReactElement {
  return (
    <>
      <ProductCard
        category="coffee"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere vero a est quisquam accusantium architecto iure, modi sit perferendis"
        id={1000000}
        imgUrl={(imageSrc as string) || "https://via.placeholder.com/400"}
        price={20000}
        stock={20}
        title="Cappucino Coffee"
        key="coffee"
      />
    </>
  );
}
