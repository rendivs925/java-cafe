import { getBlogByIdAction } from "@/actions/getBlogByIdAction";
import BaseContainer from "@/components/BaseContainer";
import BaseContent from "@/components/BaseContent";
import ReactMarkdown from "react-markdown";

export default async function page({ params }: { params: { blogId: string } }) {
  const { blogId } = params;
  const response = await getBlogByIdAction(blogId);
  const content = response.data?.content;

  return (
    <BaseContainer>
      <BaseContent className="max-w-[80ch] mx-auto">
        <ReactMarkdown>{content}</ReactMarkdown>
      </BaseContent>
    </BaseContainer>
  );
}
