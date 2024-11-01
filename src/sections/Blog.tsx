import Title from "@/components/Title";
import BlogsList from "@/components/BlogsList";

export default async function Blog() {
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
