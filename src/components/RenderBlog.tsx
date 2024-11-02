import BaseContainer from "@/components/BaseContainer";
import BaseContent from "@/components/BaseContent";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IBlog } from "@/models/Blog";

// Define types for the blog data
interface Author {
  imgUrl: string;
  username: string;
}

// Reusable components with types
const AuthorInfo: React.FC<{ author: Author; createdAt: string | Date }> = ({
  author,
  createdAt,
}) => (
  <div className="flex gap-3 items-center">
    <Avatar className="size-11 rounded-full overflow-hidden cursor-pointer">
      <AvatarImage src={author?.imgUrl} className="object-cover" />
    </Avatar>
    <span>
      <p className="mt-0 font-medium text-primary">{author?.username}</p>
      <p className="mt-0 text-sm">{new Date(createdAt).toLocaleString()}</p>
    </span>
  </div>
);

const BlogTags: React.FC<{ tags: string[] }> = ({ tags }) => (
  <div className="mt-12 flex gap-4 flex-wrap">
    {tags.map((tag) => (
      <Badge
        key={tag}
        className="bg-secondary px-6 py-1 font-normal text-muted-foreground text-lg hover:bg-secondary"
      >
        {tag}
      </Badge>
    ))}
  </div>
);

const BlogContent: React.FC<{ content: string }> = ({ content }) => (
  <ReactMarkdown
    className="prose max-w-[80ch]"
    remarkPlugins={[remarkGfm]}
    components={{
      code({ node, inline, className, children, ...props }: any) {
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
          <SyntaxHighlighter
            style={dracula}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        );
      },
    }}
  >
    {content}
  </ReactMarkdown>
);

const RenderBlog = ({ data }: { data: IBlog }) => {
  return (
    <BaseContainer>
      <BaseContent className="max-w-[80ch] mx-auto">
        <h1 className="mb-10">{data?.title}</h1>
        <AuthorInfo author={data?.author} createdAt={data?.createdAt as Date} />
        <div className="relative my-10 w-full overflow-hidden">
          <Image
            src={data?.prevImgUrl}
            alt={data?.title}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            objectFit="contain"
          />
        </div>
        <BlogContent content={data?.content} /> {/* Pass the content directly */}
        <BlogTags tags={data?.tags} />
      </BaseContent>
    </BaseContainer>
  );
};

export default RenderBlog;
