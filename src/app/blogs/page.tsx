import BlogCatalog from "@/components/BlogCatalog";
import BaseContainer from "@/components/BaseContainer";
import BaseHeader from "@/components/BaseHeader";
import BaseContent from "@/components/BaseContent";

export default async function Products() {
  return (
    <BaseContainer>
      <BaseHeader title="Our Blogs" />
      <BaseContent>
        <BlogCatalog />
      </BaseContent>
    </BaseContainer>
  );
}
