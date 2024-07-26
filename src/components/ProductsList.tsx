// Import necessary libraries and components
"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ProductCard from "./ProductCard";
import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { newAddProductType } from "@/schemas/AddProductSchema";

// Define the product type, extending newAddProductType with an ID
export type ProductType = newAddProductType & { _id: string };

// Define props for ProductsList (empty in this case)
export interface ProductsListProps {}

// Define the ProductsList component
export default function ProductsList(props: ProductsListProps): ReactNode {
  // State for products, loading, and error
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/products`);
        console.log(response.data);
        setProducts(response.data.products);
      } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        id={product._id}
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
}
