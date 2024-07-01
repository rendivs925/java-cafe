import { BlogsList, Title } from "@/components";
import { type ReactElement } from "react";

export interface BlogProps {}

export default function Blog(props: BlogProps): ReactElement {
  return (
    <section id="blog">
      <div className="container">
        <Title
          title="Our Blog Posts"
          description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries"
        />
        <BlogsList />
      </div>
    </section>
  );
}
