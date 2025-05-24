import EditBlogForm from "@/components/EditBlogForm";
import DashboardContainer from "@/components/DashboardContainer";
import DashboardContent from "@/components/DashboardContent";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardTitle from "@/components/DashboardTitle";
import { SearchParams } from "@/types";
import { getBlogByIdAction } from "@/actions/getBlogByIdAction";
import { IBlog } from "@/models/Blog";

export default async function EditBlogPage(
  props: {
    searchParams: Promise<SearchParams>;
  }
) {
  const searchParams = await props.searchParams;
  const blogId = (await searchParams["blogId"]) ?? "";
  const response = await getBlogByIdAction(blogId as string);
  const blog = response.data;

  return (
    <DashboardContainer>
      <DashboardHeader className="max-w-[80ch] mx-auto">
        <DashboardTitle>Edit Product</DashboardTitle>
      </DashboardHeader>
      <DashboardContent className="space-y-12 bg-transparent min-h-96 max-w-[80ch] mx-auto">
        <EditBlogForm blog={blog as IBlog} />
      </DashboardContent>
    </DashboardContainer>
  );
}
