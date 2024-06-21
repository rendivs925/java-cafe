"use client";

import { type ReactElement } from "react";

import { Navigation, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { blogs } from "@/constanst";
import BlogCard from "./BlogCard";
export interface BlogsListProps {}

export default function BlogsList(props: BlogsListProps): ReactElement {
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
      {blogs.map(({ title, description, id }) => {
        return (
          <SwiperSlide key={id}>
            <BlogCard title={title} description={description} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
