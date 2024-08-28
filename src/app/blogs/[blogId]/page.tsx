import { getBlogByIdAction } from "@/actions/getBlogByIdAction";
import BaseContainer from "@/components/BaseContainer";
import BaseContent from "@/components/BaseContent";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Import remark-gfm plugin for GitHub Flavored Markdown

export default async function Page({ params }: { params: { blogId: string } }) {
  const { blogId } = params;
  const response = await getBlogByIdAction(blogId);
  const content = response.data?.content || "";

  return (
    <BaseContainer>
      <BaseContent className="max-w-[80ch] mx-auto">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]} // Use remark-gfm for GitHub Flavored Markdown
        >
          {content}
        </ReactMarkdown>
      </BaseContent>
    </BaseContainer>
  );
}
