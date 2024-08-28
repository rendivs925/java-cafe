import { Suspense, type ReactElement } from "react";
import DashboardContainer from "@/components/DashboardContainer";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardTitle from "@/components/DashboardTitle";
import DashboardContent from "@/components/DashboardContent";
import SelectShowing from "@/components/SelectShowing";
import AddButton from "@/components/AddButton";
import BlogsTable from "@/components/BlogsTable";

export default function BlogsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): ReactElement {
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
        <DashboardContent className="bg-background p-6 rounded-lg">
          <BlogsTable searchParams={searchParams} />
        </DashboardContent>
      </DashboardContainer>
    </Suspense>
  );
}
