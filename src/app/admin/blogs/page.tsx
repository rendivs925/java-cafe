import { Suspense, type ReactElement } from "react";
import DashboardContainer from "@/components/DashboardContainer";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardTitle from "@/components/DashboardTitle";
import DashboardContent from "@/components/DashboardContent";
import SelectShowing from "@/components/SelectShowing";
import AddButton from "@/components/AddButton";
import BlogsTable from "@/components/BlogsTable";
import { SearchParams } from "@/types";

export default async function BlogsPage(
  props: {
    searchParams: Promise<SearchParams>;
  }
): Promise<ReactElement> {
  const searchParams = await props.searchParams;
  return (
    <Suspense>
      <DashboardContainer>
        <DashboardHeader className="flex justify-between">
          <DashboardTitle>Blogs</DashboardTitle>
          <div className="flex gap-6">
            <SelectShowing />
            <AddButton label="Add New Blog" route="/admin/blogs/add" />
          </div>
        </DashboardHeader>
        <DashboardContent className="bg-background shadow p-6 rounded-lg">
          <BlogsTable searchParams={searchParams} />
        </DashboardContent>
      </DashboardContainer>
    </Suspense>
  );
}
