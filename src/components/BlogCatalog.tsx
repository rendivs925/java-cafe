"use client";
import { useEffect, useState, useRef } from "react";
import BlogCard from "./BlogCard";
import { IBlog } from "@/models/Blog";
import { getBlogsAction } from "@/actions/getBlogsAction";

export default function BlogCatalog() {
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);
  const [items, setItems] = useState<IBlog[]>([]);
  const [totalItemsLength, setTotalItemsLength] = useState(0);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { items: fetchedItems, totalItemsLength: totalLength } =
        await getBlogsAction(page, perPage);
      setItems((prevItems) => [...prevItems, ...fetchedItems]);
      setTotalItemsLength(totalLength);
    };

    fetchBlogs();
  }, [page, perPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 },
    );

    const currentRef = lastItemRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [lastItemRef]);

  return (
    <div className="flex flex-wrap -mx-4 gap-y-6">
      {items.map(({ title, description, prevImgUrl, _id }, index) => (
        <div
          className="px-4 w-full md:w-1/2 lg:w-1/3"
          key={_id}
          ref={index === items.length - 1 ? lastItemRef : null}
        >
          <BlogCard
            id={_id.toString() as string}
            title={title}
            imgUrl={prevImgUrl}
            description={description}
          />
        </div>
      ))}
    </div>
  );
}
