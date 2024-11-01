"use client";
import { useEffect, useState, useRef, useCallback, LegacyRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import { newAddProductType } from "@/schemas/AddProductSchema";
import { getProductsAction } from "@/actions/getProductsAction";
import { IProduct } from "@/models/Product";

export type ProductType = newAddProductType & {
  _id: string | number;
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

const ProductsList = () => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalProductsLength, setTotalProductsLength] = useState(0);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const fetchProducts = useCallback(async () => {
    const { items: fetchedProducts, totalItemsLength: totalLength } = await getProductsAction(page, perPage);
    setProducts((prevProducts) => [...prevProducts, ...fetchedProducts] as IProduct[]);
    setTotalProductsLength(totalLength);
  }, [page, perPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const totalPages = Math.ceil(totalProductsLength / perPage);
  const hasNextPage = page < totalPages;

  // Intersection Observer to load more items when the last 3 items are in view
  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const lastItemsInView = entries.some(entry => entry.isIntersecting);
        if (lastItemsInView) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.5 }
    );

    const lastThreeRefs = itemRefs.current.slice(-3);
    lastThreeRefs.forEach(ref => ref && observer.observe(ref));

    return () => {
      lastThreeRefs.forEach(ref => ref && observer.unobserve(ref));
    };
  }, [products, hasNextPage]);

  const renderSlide = (product: IProduct, index: number) => (
    <CarouselItem
      className="pl-12 md:basis-1/2 lg:basis-1/3"
      key={product?._id?.toString() as string}
      ref={(el: any) => (itemRefs.current[index] = el)}
    >
      <ProductCard
        capital={product.capital}
        weight={product.weight}
        title={product.title}
        price={product.price}
        profit={product.profit}
        category={product.category}
        stock={product.stock}
        description={product.description}
        imgUrl={product.imgUrl}
        _id={product?._id?.toString() as string}
      />
    </CarouselItem>
  );

  return (
    <Carousel>
      <CarouselContent className="-ml-12">
        {products.map((product, index) => renderSlide(product, index))}
      </CarouselContent>
      <CarouselPrevious className="max-lg:hidden" />
      <CarouselNext className="max-lg:hidden" />
    </Carousel>
  );
};

export default ProductsList;
