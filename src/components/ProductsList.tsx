// components/ProductsList.tsx
"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import { newAddProductType } from "@/schemas/AddProductSchema";

// Define the product type, extending newAddProductType with an ID
export type ProductType = newAddProductType & {
  _id: string | number;
  createdAt: Date;
  updatedAt: Date;
};

// Define props for ProductsList, now including products
export interface ProductsListProps {
  products: ProductType[];
}

// Define the ProductsList component
const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  // Render individual slides
  const renderSlide = (product: ProductType) => (
    <CarouselItem className="pl-12 md:basis-1/2 lg:basis-1/3" key={product._id}>
      <ProductCard
        title={product.title}
        price={product.price}
        category={product.category}
        stock={product.stock}
        description={product.description}
        imgUrl={product.imgUrl}
        id={product._id.toString() as string}
      />
    </CarouselItem>
  );

  // Render the carousel with products
  return (
    <Carousel>
      <CarouselContent className="-ml-12">
        {products?.map((product) => renderSlide(product))}
      </CarouselContent>
      <CarouselPrevious className="max-lg:hidden" />
      <CarouselNext className="max-lg:hidden" />
    </Carousel>
  );
};

export default ProductsList;
