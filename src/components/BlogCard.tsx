"use client";
import { Blog } from "@/types";
import Image from "next/legacy/image";
import { memo, type ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import useAppContext from "@/hooks/useAppContext";

function BlogCard({ title, description, imgUrl, id }: Blog): ReactElement {
  const { pushRoute } = useAppContext();

  const handleClick = () => {
    pushRoute(`/blogs/${id}`);
  };

  return (
    <Card className="bg-transparent space-y-6 shadow-none rounded-lg overflow-hidden">
      <CardHeader
        onClick={handleClick}
        className="relative shadow overflow-hidden cursor-pointer aspect-video rounded-lg"
      >
        <Image
          src={imgUrl}
          className="rounded-lg hover:scale-125 transition-all duration-300"
          alt="Blog"
          objectFit="cover"
          loading="eager"
          layout="fill"
        />
      </CardHeader>
      <CardContent className="prose pb-6 px-0">
        <CardTitle
          onClick={handleClick}
          className="cursor-pointer transition-all duration-500 hover:underline"
        >
          {title}
        </CardTitle>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}

export default memo(BlogCard);
