import { type ReactElement } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import BlogCard from "./BlogCard";
import { IBlog } from "@/models/Blog";

export interface BlogsListProps {
  items: IBlog[];
}

export default function BlogsList({ items }: BlogsListProps): ReactElement {
  return (
    <Carousel>
      <CarouselContent className="-ml-12">
        {items.map(({ title, description, prevImgUrl, _id }) => {
          return (
            <CarouselItem className="pl-12 md:basis-1/2 lg:basis-1/3" key={_id}>
              <BlogCard
                id={_id as number | string}
                title={title}
                imgUrl={prevImgUrl}
                description={description}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="max-lg:hidden" />
      <CarouselNext className="max-lg:hidden" />
    </Carousel>
  );
}
