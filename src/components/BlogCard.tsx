import { Blog } from "@/types";
import Image from "next/image";
import { type ReactElement } from "react";

export default function BlogCard({
  title,
  description,
}: Omit<Blog, "id">): ReactElement {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-video rounded-lg overflow-hidden shadow">
        <Image
          src="/images/blog1.avif"
          alt="Blog"
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
