import { getBlogByIdAction } from "@/actions/getBlogByIdAction";
import RenderBlog from "@/components/RenderBlog";

interface BlogParams {
  params: {
    blogId: string;
  };
}

// Main component with types
const Page: React.FC<BlogParams> = async props => {
  const params = await props.params;
  const { blogId } = params;
  const response = await getBlogByIdAction(blogId);
  const data = response.data;

  if (!data) {
    return <div>Error: Blog not found.</div>;
  }

  return <RenderBlog data={data} />;
};

export default Page;
