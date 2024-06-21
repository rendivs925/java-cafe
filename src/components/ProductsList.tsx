"use client";

import { Navigation, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import { products } from "@/constanst";
import { ReactNode } from "react";

export interface ProductsListProps {}

export default function ProductsList(props: ProductsListProps): ReactNode {
  return (
    <Swiper
      modules={[Navigation, A11y]}
      spaceBetween={48}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      navigation
    >
      {products.map(({ title, description, id, price }) => {
        return (
          <SwiperSlide key={id}>
            <ProductCard
              title={title}
              price={price}
              description={description}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
