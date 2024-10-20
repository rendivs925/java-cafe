import "react-quill/dist/quill.snow.css";
import DashboardContainer from "@/components/DashboardContainer";
import DashboardContent from "@/components/DashboardContent";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardTitle from "@/components/DashboardTitle";
import AddBlogForm from "@/components/AddBlogForm";
import { IBlog } from "@/models/Blog";

export interface IBlogWithPreviewImage extends Omit<IBlog, "prevImgUrl"> {
  previewImage: File;
}

export default async function AddBlogPage() {
  return (
    <div className="flex gap-10 justify-center">
      <DashboardContainer className="!pr-0">
        <DashboardHeader className="max-w-[80ch] mx-auto">
          <DashboardTitle>Add New Blog</DashboardTitle>
        </DashboardHeader>
        <DashboardContent className="space-y-12 bg-transparent min-h-96 max-w-[80ch] mx-auto">
          <AddBlogForm />
        </DashboardContent>
      </DashboardContainer>
    </div>
  );
}
