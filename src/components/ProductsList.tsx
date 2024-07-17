import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ProductCard from "./ProductCard";
import { products } from "@/constanst";
import { ReactNode } from "react";
import { Product } from "@/types";

export interface ProductsListProps {}

export default function ProductsList(props: ProductsListProps): ReactNode {
  const renderSlide = ({
    title,
    stock,
    category,
    id,
    description,
    price,
    imgUrl,
  }: Product) => (
    <CarouselItem className="pl-12 md:basis-1/2 lg:basis-1/3" key={id}>
      <ProductCard
        title={title}
        price={price}
        category={category}
        stock={stock}
        description={description}
        imgUrl={imgUrl}
        id={id}
      />
    </CarouselItem>
  );

  return (
    <Carousel>
      <CarouselContent className="-ml-12">
        {products.map(
          ({ title, category, stock, description, id, price, imgUrl }) => {
            return renderSlide({
              title,
              description,
              id,
              price,
              imgUrl,
              category,
              stock,
            });
          }
        )}
      </CarouselContent>
      <CarouselPrevious className="max-lg:hidden" />
      <CarouselNext className="max-lg:hidden" />
    </Carousel>
  );
}
