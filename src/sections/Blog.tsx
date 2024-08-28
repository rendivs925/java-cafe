import Title from "@/components/Title";
import BlogsList from "@/components/BlogsList";
import { getBlogsAction } from "@/actions/getBlogsAction";

export interface BlogProps {}

export default async function Blog({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "5";
  const { items, totalItemsLength } = await getBlogsAction(
    Number(page),
    Number(per_page)
  );

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const totalPages = Math.ceil(totalItemsLength / Number(per_page));

  return (
    <section id="blog">
      <div className="container">
        <Title
          title="Our Blog Posts"
          description="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries"
        />
        <BlogsList items={items} />
      </div>
    </section>
  );
}
