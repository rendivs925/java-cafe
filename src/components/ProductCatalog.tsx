"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ProductCard from "./ProductCard";
import { newAddProductType } from "@/schemas/AddProductSchema";
import { getProductsAction } from "@/actions/getProductsAction";
import useClientComponent from "@/hooks/useClientComponent";
import { IProduct } from "@/models/Product";

export type ProductType = newAddProductType & {
  _id: string | number;
  createdAt?: Date;
  updatedAt?: Date;
};

const CACHE_EXPIRY = 1000 * 60 * 10; // 10 minutes

const ProductCatalog = React.memo(() => {
  const lastProductRef = useRef<HTMLDivElement | null>(null);
  const isClient = useClientComponent();
  const scrollPosRef = useRef<number>(0);

  const [page, setPage] = useState(1);
  const perPage = 10;
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalItemsLength, setTotalItemsLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    const cacheKey = `products`;
    const cacheTimestampKey = `${cacheKey}-timestamp`;
    const cachedData = localStorage.getItem(cacheKey);
    const cachedTimestamp = localStorage.getItem(cacheTimestampKey);

    const isCacheValid = cachedTimestamp && (Date.now() - parseInt(cachedTimestamp, 10) < CACHE_EXPIRY);

    if (cachedData && isCacheValid) {
      const cachedPages = JSON.parse(cachedData);
      const cachedPage = cachedPages[page];

      if (cachedPage) {
        setProducts((prev) => [...prev, ...cachedPage.items]);
        setTotalItemsLength(cachedPage.totalItemsLength);
        setIsLoading(false);
        return;
      }
    } else {
      // Clear expired cache if outdated
      localStorage.removeItem(cacheKey);
      localStorage.removeItem(cacheTimestampKey);
    }

    const { items, totalItemsLength } = await getProductsAction(page, perPage);
    setProducts((prev) => [...prev, ...items] as IProduct[]);
    setTotalItemsLength(totalItemsLength);

    // Cache new data along with previous pages
    const updatedCache = cachedData && isCacheValid
      ? { ...JSON.parse(cachedData), [page]: { items, totalItemsLength } }
      : { [page]: { items, totalItemsLength } };

    localStorage.setItem(cacheKey, JSON.stringify(updatedCache));
    localStorage.setItem(cacheTimestampKey, Date.now().toString());

    setIsLoading(false);
  }, [page, perPage, isLoading]);

  const totalPages = Math.ceil(totalItemsLength / perPage);
  const hasNextPage = page < totalPages;

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasNextPage]);

  useEffect(() => {
    fetchProducts();
  }, [page, fetchProducts]);

  // Save the scroll position to avoid jumping on render
  useEffect(() => {
    const handleScroll = () => {
      scrollPosRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, scrollPosRef.current);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = lastProductRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMore, isLoading]);

  return (
    <div className="flex flex-wrap -mx-4 gap-y-6">
      {isClient && products.map((product, index) => (
        <div
          className="px-4 mb-6 w-full md:basis-1/2 lg:basis-1/3"
          key={product?._id?.toString() as string}
          ref={index === products.length - 1 ? lastProductRef : null}
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
        </div>
      ))}
      {isLoading && <div className="text-center w-full">Loading...</div>}
    </div>
  );
});

export default ProductCatalog;
