import { Blog } from "@/types";
import Image from "next/image";
import { type ReactElement } from "react";

export default function BlogCard({
  title,
  description,
}: Omit<Blog, "id">): ReactElement {
  return (
    <li className="flex flex-col gap-3xl">
      <div className="relative aspect-video rounded-lg overflow-hidden shadow">
        <Image src="/images/blog-1.png" alt="Blog" layout="fill" />
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </li>
  );
}
