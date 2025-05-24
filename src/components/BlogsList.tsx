"use client";
import { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BlogCard from "./BlogCard";
import { IBlog } from "@/models/Blog";
import { getBlogsAction } from "@/actions/getBlogsAction";

export default function BlogsList() {
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [totalBlogsLength, setTotalBlogsLength] = useState(0);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const fetchBlogs = async () => {
    const { items: fetchedItems, totalItemsLength: totalLength } =
      await getBlogsAction(page, perPage);
    setBlogs((prevBlogs) => [...prevBlogs, ...fetchedItems]);
    setTotalBlogsLength(totalLength);
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const totalPages = Math.ceil(totalBlogsLength / perPage);
  const hasNextPage = page < totalPages;

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.5 },
    );

    const lastRefs = itemRefs.current.slice(-3); // Observe the last 3 items
    lastRefs.forEach((ref) => ref && observer.observe(ref));

    return () => {
      lastRefs.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, [blogs, hasNextPage]);

  return (
    <Carousel>
      <CarouselContent className="-ml-12">
        {blogs.map(({ title, description, prevImgUrl, _id }, index) => (
          <CarouselItem
            className="pl-12 md:basis-1/2 lg:basis-1/3"
            key={_id?.toString()}
            ref={(el: any) => (itemRefs.current[index] = el)}
          >
            <BlogCard
              id={_id as number | string}
              title={title}
              imgUrl={prevImgUrl}
              description={description}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="max-lg:hidden" />
      <CarouselNext className="max-lg:hidden" />
    </Carousel>
  );
}
